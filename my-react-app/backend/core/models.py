# core/models.py

from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    cgpa = models.FloatField()
    branch = models.CharField(max_length=50)
    year = models.IntegerField()
    profile_pic = models.ImageField(upload_to='profile_pics/')

    def __str__(self):
        return self.name
