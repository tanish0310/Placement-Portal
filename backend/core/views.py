# core/views.py

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.timezone import now

import json
import random

from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework import status

from django.core.mail import send_mail
from django.contrib.auth.hashers import check_password, make_password

from .models import Student, Company, Job, AdminOTP
from .serializers import (
    LoginSerializer,
    StudentSerializer,
    CompanySerializer,
    JobSerializer
)

# ----------------------------- STUDENT AUTH -------------------------------- #

@api_view(['POST'])
def student_signup(request):
    student_data = {
        'name': request.data.get('name'),
        'email': request.data.get('email'),
        'password': make_password(request.data.get('password')),
        'cgpa': request.data.get('cgpa'),
        'branch': request.data.get('branch'),
        'year': request.data.get('year'),
        'profile_pic': request.FILES.get('profile_pic'),
    }

    serializer = StudentSerializer(data=student_data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Student registered successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def student_login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            student = Student.objects.get(email=email)
            if check_password(password, student.password):
                student_data = StudentSerializer(student).data
                return Response(student_data, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Incorrect password"}, status=status.HTTP_400_BAD_REQUEST)
        except Student.DoesNotExist:
            return Response({"detail": "Student does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ----------------------------- COMPANY AUTH -------------------------------- #

@api_view(['POST'])
def company_signup(request):
    company_data = {
        'name': request.data.get('name'),
        'email': request.data.get('email'),
        'password': make_password(request.data.get('password')),
    }

    serializer = CompanySerializer(data=company_data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Company registered successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def company_login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            company = Company.objects.get(email=email)
            if check_password(password, company.password):
                company_data = CompanySerializer(company).data
                return Response(company_data, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Incorrect password"}, status=status.HTTP_400_BAD_REQUEST)
        except Company.DoesNotExist:
            return Response({"detail": "Company not found"}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ----------------------------- JOB MANAGEMENT ------------------------------ #

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Company, Job
from .serializers import JobSerializer

class JobCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        # Get company ID - adjust based on your authentication system
        # If using token auth, you might get company ID from request.user
        company_id = request.data.get('company')
        
        if not company_id:
            return Response(
                {"error": "Company ID is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            company = Company.objects.get(id=company_id)
        except Company.DoesNotExist:
            return Response(
                {"error": "Company not found"},
                status=status.HTTP_400_BAD_REQUEST
            )

        job_data = {
            'title': request.data.get('title'),
            'description': request.data.get('description'),
            'location': request.data.get('location'),
            'salary': request.data.get('salary'),
            'eligibility': request.data.get('eligibility'),
            'deadline': request.data.get('deadline'),
            'company': company.id
        }

        serializer = JobSerializer(data=job_data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Job created successfully",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        
        return Response(
            {
                "error": "Invalid data",
                "details": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )

class JobListAPIView(ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    ordering = ['-created_at']


# ----------------------------- ADMIN OTP SYSTEM ---------------------------- #

@csrf_exempt
def send_admin_otp(request):
    data = json.loads(request.body)
    email = data.get("email")

    if not email:
        return JsonResponse({"detail": "Email is required"}, status=400)

    otp = str(random.randint(10000, 99999))
    AdminOTP.objects.create(email=email, otp=otp)

    send_mail(
        subject="Your Admin OTP",
        message=f"Your OTP is: {otp}",
        from_email="noreply@placementportal.com",
        recipient_list=[email],
    )

    return JsonResponse({"detail": "OTP sent successfully"})


@csrf_exempt
def verify_admin_otp(request):
    if request.method != "POST":
        return JsonResponse({"detail": "Method not allowed"}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get("email")
        otp = data.get("otp")

        if not email or not otp:
            return JsonResponse({"detail": "Email and OTP are required"}, status=400)

        latest_otp = AdminOTP.objects.filter(email=email).latest("created_at")

        if latest_otp.otp == otp:
            if not latest_otp.is_expired():
                return JsonResponse({"success": True, "admin": {"email": email}}, status=200)
            else:
                return JsonResponse({"detail": "OTP has expired"}, status=400)
        else:
            return JsonResponse({"detail": "Incorrect OTP"}, status=400)

    except AdminOTP.DoesNotExist:
        return JsonResponse({"detail": "No OTP found for this email"}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({"detail": "Invalid JSON body"}, status=400)
    except Exception as e:
        return JsonResponse({"detail": f"Unexpected error: {str(e)}"}, status=500)


# ----------------------------- JOB APPLY VIEW ---------------------------- #

from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Job, JobApplication
from .serializers import JobApplicationSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def apply_job(request, job_id):
    try:
        job = Job.objects.get(id=job_id)
    except Job.DoesNotExist:
        return Response({"error": "Job not found"}, status=404)

    resume_file = request.FILES.get('resume')

    if not resume_file:
        return Response({"error": "No resume uploaded"}, status=400)

    application = JobApplication.objects.create(
        student=request.user,
        job=job,
        resume=resume_file
    )

    serializer = JobApplicationSerializer(application)
    return Response(serializer.data, status=201)
# ----------------------------------------------change pwd--------------------------------------------------#
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import PasswordResetOTP
import random, string
import json

@csrf_exempt
def send_otp(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')

        otp = ''.join(random.choices(string.digits, k=6))
        PasswordResetOTP.objects.create(email=email, otp=otp)

        # Send OTP via email
        send_mail(
            subject='Your OTP Code',
            message=f'Your OTP for password reset is {otp}',
            from_email='your@email.com',
            recipient_list=[email],
        )

        return JsonResponse({'message': 'OTP sent to email'})

from django.contrib.auth import get_user_model

@csrf_exempt
def reset_password(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        otp = data.get('otp')
        new_password = data.get('new_password')

        try:
            otp_record = PasswordResetOTP.objects.filter(email=email, otp=otp).latest('created_at')
            if not otp_record.is_valid():
                return JsonResponse({'error': 'OTP expired'}, status=400)
        except PasswordResetOTP.DoesNotExist:
            return JsonResponse({'error': 'Invalid OTP'}, status=400)

        user = get_user_model().objects.get(email=email)
        user.set_password(new_password)
        user.save()

        return JsonResponse({'message': 'Password reset successful'})


# ------------------------------------------------------------------------------------

class CompanyListView(APIView):
    def get(self, request):
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)

class CompanyDeleteView(APIView):
    def delete(self, request, pk):
        try:
            company = Company.objects.get(pk=pk)
            company.delete()
            return Response({"message": "Company deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Company.DoesNotExist:
            return Response({"error": "Company not found"}, status=status.HTTP_404_NOT_FOUND)
        


class StudentListView(APIView):
    def get(self, request):
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

class StudentDeleteView(APIView):
    def delete(self, request, pk):
        try:
            student = Student.objects.get(pk=pk)
            student.delete()
            return Response({"message": "Student deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)