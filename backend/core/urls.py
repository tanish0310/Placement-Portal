# core/urls.py

from django.urls import path
from .views import student_signup
# This route will handle requests to /signup/student/ where you’ll send the sign-up data from the React app.
urlpatterns = [
    path("signup/student/", student_signup, name="student-signup"),
]
