from django.contrib.auth.backends import BaseBackend
from .models import Student, Company
from django.contrib.auth import get_user_model

class CustomAuthenticationBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        # Try to authenticate as a Student
        try:
            student = Student.objects.get(email=email)
            if student.check_password(password):  # Verifies hashed password
                return student
        except Student.DoesNotExist:
            pass  # If no student found, check for company
        
        # If not found as Student, try to authenticate as Company
        try:
            company = Company.objects.get(email=email)
            if company.check_password(password):
                return company
        except Company.DoesNotExist:
            return None  # Return None if not found in either models
