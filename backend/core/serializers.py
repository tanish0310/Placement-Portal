# core/serializers.py
# This will ensure that the data sent from your React app is properly validated before saving it in the database.
from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['name', 'email', 'password', 'cgpa', 'branch', 'year', 'profile_pic']
        
