# core/models.py

from django.db import models

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
# from django.db import models

# class Job(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField()
#     location = models.CharField(max_length=100)
#     salary = models.DecimalField(max_digits=10, decimal_places=2)
#     eligibility = models.TextField()
#     deadline = models.DateField()
#     company = models.ForeignKey('Company', on_delete=models.CASCADE)  # ✅ Add this line

#     def __str__(self):
#         return self.title

from django.db import models
from django.utils import timezone
import datetime

class AdminOTP(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return timezone.now() > self.created_at + datetime.timedelta(minutes=5)
