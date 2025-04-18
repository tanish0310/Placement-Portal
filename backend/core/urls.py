# core/urls.py

from django.urls import path
from . import views


# This route will handle requests to /signup/student/ where you’ll send the sign-up data from the React app.
urlpatterns = [
    path("signup/student/", views.student_signup, name="student_signup"),
    path("signup/company/", views.company_signup, name="company_signup"),
    path('login/student/', views.student_login, name='student_login'),
    path('login/company/', views.company_login, name='company_login'),
    path('login/admin/send-otp/', views.send_admin_otp, name='send_admin_otp'),
    path('login/admin/verify-otp/', views.verify_admin_otp, name='verify_admin_otp'),

]
