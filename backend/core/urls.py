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
    apply_job
)
from django.conf import settings
from django.conf.urls.static import static

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

   # ✅ Correct route
path("student/apply-job/<int:job_id>/", apply_job, name="apply_job")



]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)