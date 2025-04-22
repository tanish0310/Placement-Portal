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
    decide_application,
    send_otp,reset_password,

    get_applications_by_company,
    UpdateApplicationStatusView,
    StudentAppliedJobsView
)
from django.conf import settings
from django.conf.urls.static import static
from .views import CompanyListView, CompanyDeleteView
from .views import StudentListView, StudentDeleteView
from .views import JobApplicationListView

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
   path('students/', StudentListView.as_view(), name='student-list'),
    path('students/<int:pk>/', StudentDeleteView.as_view(), name='student-delete'),
    path('send-otp/', send_otp, name='send_otp'),
    path('reset-password/', reset_password, name='reset_password'),
    path("company/view-applications/", get_applications_by_company, name='view-applications'),
    path('company/decide-application/', decide_application, name='decide_application'),
    path('student/applied-jobs', StudentAppliedJobsView.as_view(), name='student-applied-jobs'),
    path('company/update-application/<int:pk>', UpdateApplicationStatusView.as_view(), name='update-application'),
    path('applications/', JobApplicationListView.as_view(), name='job_applications'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
