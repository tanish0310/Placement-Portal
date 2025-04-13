# core/models.py

from django.db import models

from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext_lazy as _

class StudentManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        student = self.model(email=email, **extra_fields)
        student.set_password(password)  # Automatically hashes the password
        student.save(using=self._db)
        return student

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Password stored as hashed in DB
    cgpa = models.FloatField()
    branch = models.CharField(max_length=50)
    year = models.IntegerField()
    profile_pic = models.ImageField(upload_to='profile_pics/')
    created_at = models.DateTimeField(auto_now_add=True)

    objects = StudentManager()  # Use custom manager for student

    def __str__(self):
        return self.name
        return self.name
    
class Company(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
