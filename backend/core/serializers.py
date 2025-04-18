# core/serializers.py

from rest_framework import serializers
from .models import Student, Company, Job

# -----------------------------
# Student Serializer
# -----------------------------
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            'name',
            'email',
            'password',
            'cgpa',
            'branch',
            'year',
            'created_at',
            # 'profile_pic',  # Uncomment if profile_pic is used
        ]

# -----------------------------
# Company Serializer
# -----------------------------
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = [
            'id',
            'name',
            'email',
            'created_at',
        ]

# -----------------------------
# Job Serializer
# -----------------------------
class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)
    
    class Meta:
        model = Job
        fields = [
            'id',
            'title',
            'description',
            'location',
            'salary',
            'eligibility',
            'deadline',
            'company',
            'company_name',
            'created_at',
        ]
        extra_kwargs = {
            'company': {'required': True},
            'title': {'required': True},
            'description': {'required': True},
            'salary': {'required': True},
            'deadline': {'required': True},
        }

    def validate_salary(self, value):
        if float(value) <= 0:
            raise serializers.ValidationError("Salary must be positive")
        return value

    def validate_deadline(self, value):
        from django.utils import timezone
        if value < timezone.now().date():
            raise serializers.ValidationError("Deadline must be in the future")
        return value
    

# JOB APPLICATION 

from rest_framework import serializers
from .models import JobApplication

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['id', 'student', 'job', 'resume', 'applied_at']
        read_only_fields = ['id', 'applied_at']


# -----------------------------
# Login Serializer
# -----------------------------
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
