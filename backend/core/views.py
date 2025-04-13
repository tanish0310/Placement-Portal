# core/views.py

from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


from .models import Student
from .serializers import StudentSerializer
from .models import Company
from .serializers import CompanySerializer
from django.contrib.auth import authenticate
from .serializers import LoginSerializer


@api_view(['POST'])
def student_signup(request):
    # Extract required fields only
    student_data = {
        'name': request.data.get('name'),
        'email': request.data.get('email'),
        'password': request.data.get('password'),
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
        'password': request.data.get('password'),
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
    if request.method == 'POST':
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)
            
            if user and isinstance(user, Student):  # Check if the user is a student
                # Here you can create a token, session, or perform any other logic
                # For example, using Token Authentication:
                # token = Token.objects.create(user=user)  # if you are using TokenAuthentication
                return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Invalid credentials or not a student"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def company_login(request):
    if request.method == 'POST':
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)
            
            if user and isinstance(user, Company):  # Check if the user is a company
                # Here you can create a token, session, or perform any other logic
                return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Invalid credentials or not a company"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

