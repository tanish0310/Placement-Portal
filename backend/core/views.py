# core/views.py

from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.decorators import api_view

from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password

from .serializers import LoginSerializer
from .serializers import StudentSerializer, CompanySerializer
from .serializers import JobSerializer
from .models import Student
from .models import Company






import random
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.timezone import now
import json
from .models import AdminOTP




@api_view(['POST'])
def post_job(request):
    company_name = request.data.get('company_name')  # Get company_name from request data
    if not company_name:
        return Response({"detail": "Company name is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        company = Company.objects.get(name=company_name)  # Find company by name
    except Company.DoesNotExist:
        return Response({"detail": "Company not found"}, status=status.HTTP_404_NOT_FOUND)

    # Prepare the job data
    job_data = {
        "title": request.data.get("title"),
        "description": request.data.get("description"),
        "location": request.data.get("location"),
        "salary": request.data.get("salary"),
        "eligibility_criteria": request.data.get("eligibility"),
        "application_deadline": request.data.get("deadline"),
        "company": company.id,  # Associate the job with the company
    }

    serializer = JobSerializer(data=job_data)
    if serializer.is_valid():
        serializer.save()  # Save the job instance
        return Response({"message": "Job posted successfully"}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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







@api_view(['POST'])
def student_signup(request):
    student_data = {
        'name': request.data.get('name'),
        'email': request.data.get('email'),
        'password': make_password(request.data.get('password')),  # ✅ hash the password here
        'cgpa': request.data.get('cgpa'),
        'branch': request.data.get('branch'),
        'year': request.data.get('year'),
        'profile_pic': request.FILES.get('profile_pic'),
    }

    serializer = StudentSerializer(data=student_data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Student registered successfully"}, status=status.HTTP_201_CREATED)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    else:
        print("Serializer errors:", serializer.errors)
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