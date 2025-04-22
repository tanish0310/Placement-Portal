# core/models.py

from django.db import models
from django.utils import timezone
import datetime

class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Password stored as hashed in DB
    cgpa = models.FloatField()
    branch = models.CharField(max_length=50)
    year = models.IntegerField()
    profile_pic = models.ImageField(upload_to='profile_pics/')
    created_at = models.DateTimeField(auto_now_add=True)

    

    def __str__(self):
        return self.name
    
    
       
    
class Company(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

from django.db import models

# -------------------------------------------------------JOB---------------------------------------# 
class Job(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    eligibility = models.TextField()
    deadline = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.title
    

# ----------------------------APPLICATIONS TABLE-----------------------------------------------#

from django.db import models

class JobApplication(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)
    preferred_location = models.CharField(max_length=100, null=True, blank=True)  # Make this nullable
    applied_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('Pending', 'Pending'),
            ('Accepted', 'Accepted'),
            ('Rejected', 'Rejected')
        ],
        default='Pending'
    )

    def __str__(self):
        return f"{self.student.name} - {self.job.title} - {self.status}"  # Accessing related fields



#------------------------------------------------------------------------------------------------------------------#

 
class AdminOTP(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return timezone.now() > self.created_at + datetime.timedelta(minutes=5)



from django.db import models
from django.utils import timezone
import random

class PasswordResetOTP(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(default=timezone.now)

    def is_valid(self):
        return timezone.now() - self.created_at < timezone.timedelta(minutes=10)
