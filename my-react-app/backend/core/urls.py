# core/urls.py

from django.urls import path
from .views import student_signup

urlpatterns = [
    path("signup/student/", student_signup, name="student-signup"),
]
