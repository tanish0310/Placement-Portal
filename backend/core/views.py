# core/views.py

from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from .models import Student
from .models import Company


from .serializers import LoginSerializer
from .serializers import StudentSerializer, CompanySerializer





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