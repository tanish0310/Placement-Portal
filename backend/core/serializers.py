# core/serializers.py
# This will ensure that the data sent from your React app is properly validated before saving it in the database.
from rest_framework import serializers
from .models import Student
from .models import Company
from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'company', 'title', 'description', 'location', 'salary', 'eligibility_criteria', 'application_deadline', 'created_at']
        read_only_fields = ['company', 'created_at']




class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['name', 'email', 'password', 'cgpa', 'branch', 'year', 'created_at']
    
# , 'profile_pic'
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['name', 'email', 'password', 'created_at']

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
        

