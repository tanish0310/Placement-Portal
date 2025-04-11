# core/views.py

from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Student
from .serializers import StudentSerializer

@api_view(['POST'])
def student_signup(request):
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')
    cgpa = request.data.get('cgpa')
    branch = request.data.get('branch')
    year = request.data.get('year')
    profile_pic = request.FILES.get('profile_pic')

    # Debug print
    print("Received data:", name, email, cgpa, branch, year, profile_pic)

    # Create a new Student instance
    student_data = {
        'name': name,
        'email': email,
        'password': password,
        'cgpa': cgpa,
        'branch': branch,
        'year': year,
        'profile_pic': profile_pic
    }

    serializer = StudentSerializer(data=student_data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Student registered successfully"}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# For testing if server is up
def home(request):
    return HttpResponse("Django backend is running.")
