from django.urls import path
from .views import (
    student_signup,
    company_signup,
    student_login,
    company_login,
    send_admin_otp,
    verify_admin_otp,
    JobCreateAPIView,
    JobListAPIView,
    apply_job,
    
    send_otp,reset_password,
)
from django.conf import settings
from django.conf.urls.static import static
from .views import CompanyListView, CompanyDeleteView
from .views import StudentListView, StudentDeleteView

urlpatterns = [
    path("signup/student/", student_signup, name="student_signup"),
    path("signup/company/", company_signup, name="company_signup"),
    path('login/student/', student_login, name='student_login'),
    path('login/company/', company_login, name='company_login'),
    path('login/admin/send-otp/', send_admin_otp, name='send_admin_otp'),
    path('login/admin/verify-otp/', verify_admin_otp, name='verify_admin_otp'),
    
    # Job endpoints
    path('jobs/', JobCreateAPIView.as_view(), name='job-create'),
    path('jobs/list/', JobListAPIView.as_view(), name='job-list'),

   # apply jobs
path("student/apply-job/<int:job_id>/", apply_job, name="apply_job"),



path('companies/', CompanyListView.as_view(), name='company-list'),
    path('companies/<int:pk>/', CompanyDeleteView.as_view(), name='company-delete'),
   path('students/', StudentListView.as_view(), name='get_students'),
    path('students/<int:pk>/', StudentDeleteView.as_view(), name='delete_student'),
    path('send-otp/', send_otp, name='send_otp'),
    path('reset-password/', reset_password, name='reset_password'),
]


