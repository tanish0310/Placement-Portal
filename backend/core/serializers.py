# core/serializers.py

from rest_framework import serializers
from .models import Student, Company, Job

# -----------------------------
# Student Serializer
# -----------------------------
class StudentSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = Student
        fields = [
            'id',
            'name',
            'email',
            'password',  # Add this
            'cgpa',
            'branch',
            'year',
            'profile_pic',
            'created_at',
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

# -----------------------------
# Company Serializer
# -----------------------------
class CompanySerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = Company
        fields = [
            'id',
            'name',
            'email',
            'password',  # Add this
            'created_at',
        ]
        extra_kwargs = {
            'password': {'write_only': True}  # This ensures password is never returned in responses
        }

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

# ---------------------------------view applications-------------------------------
class ApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)
    company_name = serializers.CharField(source='job.company.name', read_only=True)  # Assuming Job has a FK to Company
    student_name = serializers.CharField(source='student.name', read_only=True)  # Add student_name field for clarity

    class Meta:
        model = JobApplication
        fields = [
            'id', 'student', 'job', 'job_title', 'company_name', 'student_name',  # Add student_name to fields
            'resume', 'preferred_location', 'applied_at', 'status'
        ]
        read_only_fields = ['id', 'applied_at', 'student', 'status']  # Make status read-only if it's being updated manually
