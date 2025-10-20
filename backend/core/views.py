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

        print(f"DEBUG - Login attempt for: {email}")  # Add this

        try:
            student = Student.objects.get(email=email)
            print(f"DEBUG - Student found: {student.name}")  # Add this
            print(f"DEBUG - Stored password: {student.password[:20]}...")  # Add this
            print(f"DEBUG - Password check result: {check_password(password, student.password)}")  # Add this
            
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
    print("=" * 50)
    print("DEBUG - Request data:", request.data)
    print("DEBUG - Name:", request.data.get('name'))
    print("DEBUG - Email:", request.data.get('email'))
    print("DEBUG - Password (before hash):", request.data.get('password'))
    print("=" * 50)
    
    password_raw = request.data.get('password')
    password_hashed = make_password(password_raw) if password_raw else None
    
    print("DEBUG - Password (after hash):", password_hashed)
    
    company_data = {
        'name': request.data.get('name'),
        'email': request.data.get('email'),
        'password': password_hashed,
    }

    print("DEBUG - Company data being serialized:", company_data)
    
    serializer = CompanySerializer(data=company_data)

    if serializer.is_valid():
        print("DEBUG - Serializer valid, saving...")
        saved_company = serializer.save()
        print("DEBUG - Saved company password:", saved_company.password)
        return Response({"message": "Company registered successfully"}, status=status.HTTP_201_CREATED)
    
    print("DEBUG - Serializer errors:", serializer.errors)
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
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Job, JobApplication, Student

@api_view(['POST'])
def apply_job(request, job_id):
    try:
        email = request.POST.get('email')
        resume = request.FILES.get('resume')

        if not email or not resume:
            return Response({"detail": "Email and resume are required."}, status=400)

        # Fetch student manually
        student = Student.objects.get(email=email)
        job = Job.objects.get(id=job_id)

        # Create JobApplication
        application = JobApplication.objects.create(
            job=job,
            student=student,
            resume=resume
        )

        return Response({"message": "Applied successfully."}, status=200)

    except Student.DoesNotExist:
        return Response({"detail": "Student not found."}, status=404)
    except Job.DoesNotExist:
        return Response({"detail": "Job not found."}, status=404)
    except Exception as e:
        return Response({"detail": str(e)}, status=500)

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

        otp = ''.join(random.choices(string.digits, k=5))
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

        print(f"DEBUG RESET - Email: {email}")  # Add this
        print(f"DEBUG RESET - OTP: {otp}")  # Add this
        print(f"DEBUG RESET - New password: '{new_password}'")  # Add this
        print(f"DEBUG RESET - Password length: {len(new_password) if new_password else 0}")  # Add this

        try:
            otp_record = PasswordResetOTP.objects.filter(email=email, otp=otp).latest('created_at')
            if not otp_record.is_valid():
                return JsonResponse({'error': 'OTP expired'}, status=400)
        except PasswordResetOTP.DoesNotExist:
            return JsonResponse({'error': 'Invalid OTP'}, status=400)

        try:
            student = Student.objects.get(email=email)
            
            # Hash and save
            hashed = make_password(new_password)
            print(f"DEBUG RESET - Hashed password: {hashed[:20]}...")  # Add this
            
            student.password = hashed
            student.save()
            
            # Verify it saved
            student.refresh_from_db()
            print(f"DEBUG RESET - Saved password: {student.password[:20]}...")  # Add this
            print(f"DEBUG RESET - Check password works: {check_password(new_password, student.password)}")  # Add this
            
            otp_record.delete()
            
            return JsonResponse({'message': 'Password reset successful'}, status=200)
        except Student.DoesNotExist:
            return JsonResponse({'error': 'Student not found'}, status=404)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@api_view(['PUT'])
def update_student_profile(request):
    email = request.data.get('email')
    
    if not email:
        return Response({"detail": "Email is required"}, status=400)
    
    try:
        student = Student.objects.get(email=email)
        
        # Update fields if provided
        if request.data.get('name'):
            student.name = request.data.get('name')
        if request.data.get('cgpa'):
            student.cgpa = request.data.get('cgpa')
        if request.data.get('branch'):
            student.branch = request.data.get('branch')
        if request.data.get('year'):
            student.year = request.data.get('year')
        if request.FILES.get('profile_pic'):
            student.profile_pic = request.FILES.get('profile_pic')
        
        student.save()
        
        # Return updated student data
        serializer = StudentSerializer(student)
        return Response(serializer.data, status=200)
        
    except Student.DoesNotExist:
        return Response({"detail": "Student not found"}, status=404)
    except Exception as e:
        return Response({"detail": str(e)}, status=500)


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
        
#------------------------------------------------------------------- GET APPLICATIONS--------------------------------------------
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])

def get_applications_by_company(request):
    email = request.GET.get('email')  # company email

    try:
        company = Company.objects.get(email=email)
        jobs = Job.objects.filter(company=company)
        applications = JobApplication.objects.filter(job__in=jobs).select_related('student', 'job')

        data = []
        for app in applications:
            # Check if the resume URL contains '/media/' and remove it if present
            resume_path = app.resume.url
            if resume_path.startswith('/media/'):
                resume_path = resume_path[7:]  # Remove '/media/' from the start

            resume_url = request.build_absolute_uri(f"{settings.MEDIA_URL}{resume_path}")

            data.append({
                "id": app.id,  # ← ADD THIS
                "student_name": app.student.name,
                "student_email": app.student.email,
                "student_cgpa": app.student.cgpa,
                "preferred_location": app.preferred_location,
                "resume_url": resume_url,
                "job_title": app.job.title,
                "applied_at": app.applied_at,
                "status": app.status,  # ← ADD THIS
            })

        return Response(data, status=200)

    except Company.DoesNotExist:
        return Response({"detail": "Company not found."}, status=404)
    except Exception as e:
        return Response({"detail": str(e)}, status=500)




# from django.conf import settings
# from core.models import JobApplication

# app = JobApplication.objects.get(id=1)
# resume_url = settings.MEDIA_URL + app.resume.url
# print(resume_url)

# ------------------------------------------------------------------JOB RELATED VIEWS------------------------------------------------------#
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import JobApplication, Student
from .serializers import JobApplicationSerializer

# For Student: View own applications
class StudentAppliedJobsView(APIView):
    def get(self, request):
        student_id = request.GET.get('student_id') 
        applications = JobApplication.objects.filter(student_id=student_id)
        serializer = JobApplicationSerializer(applications, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def get_student_applications(request):
    email = request.GET.get('email')
    
    if not email:
        return Response({"detail": "Email is required"}, status=400)
    
    try:
        student = Student.objects.get(email=email)
        applications = JobApplication.objects.filter(student=student).select_related('job', 'job__company')
        
        data = []
        for app in applications:
            data.append({
                "id": app.id,
                "job_title": app.job.title,
                "company_name": app.job.company.name,
                "location": app.job.location,
                "salary": str(app.job.salary),
                "applied_at": app.applied_at,
                "status": app.status,
                "resume_url": request.build_absolute_uri(app.resume.url) if app.resume else None,
            })
        
        return Response(data, status=200)
    except Student.DoesNotExist:
        return Response({"detail": "Student not found"}, status=404)
    except Exception as e:
        return Response({"detail": str(e)}, status=500)

# For Company: Accept/Reject Applications
class UpdateApplicationStatusView(APIView):
    def post(self, request, pk):
        try:
            application = JobApplication.objects.get(pk=pk)
            new_status = request.data.get('status')
            if new_status in ['Accepted', 'Rejected']:
                application.status = new_status
                application.save()
                return Response({"message": f"Application {new_status}."})
            else:
                return Response({"error": "Invalid status."}, status=400)
        except JobApplication.DoesNotExist:
            return Response({"error": "Application not found."}, status=404)
        
class JobApplicationListView(APIView):
    def get(self, request):
        applications = JobApplication.objects.select_related('student', 'job').all()
        data = [
            {
                "id": application.id,  # Add this
                "student": application.student.name,
                "job": application.job.title,
                "company_name": application.job.company.name,  # Add this
                "resume": application.resume.url if application.resume else None,
                "applied_at": application.applied_at,
                "status": application.status,  # Add this
                "preferred_location": application.preferred_location,  # Add this if you want
            }
            for application in applications
        ]
        return Response(data)



# -----------------------------------accept or reject applications --------------------------------------------------------#
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta

def send_application_status_email(student_email, job_title, status):
    # Customize the message based on the status
    if status == 'Accepted':
        message = f"Congratulations! Your application for the job '{job_title}' has been accepted. Your interview is scheduled for {timezone.now() + timedelta(days=3):%Y-%m-%d %H:%M:%S}."
    elif status == 'Rejected':
        message = f"Sorry, your application for the job '{job_title}' has been rejected. We appreciate your interest and encourage you to apply again in the future."

    # Sending the email
    send_mail(
        subject=f"Your Application Status for {job_title}",
        message=message,
        from_email="your_email@gmail.com",
        recipient_list=[student_email],
        fail_silently=False,
    )


from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import JobApplication
from .serializers import JobApplicationSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['POST'])
def decide_application(request):
    try:
        application_id = request.data['id']
        decision = request.data['decision']
        # Your decision handling logic here
        
        # Respond with success
        return Response({"message": "Decision updated successfully!"}, status=200)
    except Exception as e:
        return Response({"message": str(e)}, status=400)


# ----------------------------------------------------------------------------------------
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import JobApplication
from .serializers import ApplicationSerializer

@api_view(['GET'])
def view_applications(request):
    company_email = request.query_params.get('email')
    
    if not company_email:
        return Response({'error': 'Missing company email'}, status=status.HTTP_400_BAD_REQUEST)

    # Fetch applications based on company email
    job_applications = JobApplication.objects.filter(job__company__email=company_email)

    # Serialize the applications
    serializer = ApplicationSerializer(job_applications, many=True)

    return Response(serializer.data)
