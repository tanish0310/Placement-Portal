# Placement Portal

A comprehensive web-based placement management system designed for educational institutions to streamline the campus recruitment process.

## 🚀 Features

### For Students
- **User Registration & Authentication**: Secure sign up and log in
- **Profile Management**: Create and update student profiles
- **Job Listings**: Browse available job opportunities
- **Job Applications**: Apply to jobs by uploading resume 
- **Application Tracking**: Monitor application status in real-time

### For Admins
- **Admin Dashboard**: Comprehensive overview of placement activities
- **Company Management**: View and manage company profiles
- **Application Management**: Review application statuses
- **Student Management**: View and manage student profiles
- **OTP-based Login**: Secure admin authentication via email

### For Companies
- **Company Registration**: Register and create company profiles
- **Job Posting**: Post job opportunities with detailed requirements
- **Application Review**: View and manage student applications

## 🛠️ Tech Stack

### Frontend
- **React.js**: UI framework
- **Tailwind CSS**: Styling
- **Axios**: API communication
- **React Router**: Navigation

### Backend
- **Django**: Python web framework
- **Django REST Framework**: API development
- **PostgreSQL**: Database
- **Gunicorn**: WSGI HTTP Server

### Third-Party Services
- **SendGrid**: Email delivery service for OTP
- **Cloudinary**: Cloud storage for resume files
- **Railway**: Backend hosting
- **Vercel**: Frontend hosting

## 📋 Prerequisites

- Python 3.8+
- Node.js 14+
- PostgreSQL
- Git

## 🔧 Installation & Setup

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/placement-portal.git
   cd placement-portal/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Variables**
   
   Create a `.env` file in the backend root:
   ```env
   DEBUG=True
   SECRET_KEY=your-django-secret-key
   
   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/placement_db
   
   # Email Configuration (SendGrid)
   SENDGRID_API_KEY=your-sendgrid-api-key
   EMAIL_HOST_USER=your-email@example.com
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run development server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   
   Create a `.env` file in the frontend root:
   ```env
   REACT_APP_API_URL=http://localhost:8000
   ```

4. **Run development server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## 🚀 Deployment

### Backend (Railway)

1. **Connect Repository to Railway**
   - Create a new project on Railway
   - Connect your GitHub repository

2. **Add Environment Variables**
   - Add all variables from `.env` to Railway dashboard
   - Ensure `DEBUG=False` for production

3. **Deploy**
   - Railway will automatically detect Django and deploy

### Frontend (Vercel)

1. **Connect Repository to Vercel**
   - Import your repository on Vercel
   - Select the frontend directory

2. **Configure Environment Variables**
   ```env
   REACT_APP_API_URL=https://your-railway-app.up.railway.app
   ```

3. **Deploy**
   - Vercel will automatically build and deploy

## 📁 Project Structure

```
placement-portal/
├── backend/
│   ├── core/                 # Main application
│   │   ├── models.py        # Database models
│   │   ├── views.py         # API views
│   │   ├── serializers.py   # DRF serializers
│   │   └── urls.py          # URL routing
│   ├── placement_portal/    # Project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── manage.py
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   └── App.js
    ├── public/
    └── package.json
```

## 🔐 API Endpoints

### Authentication
- `POST /api/register/student/` - Student registration
- `POST /api/login/student/` - Student login
- `POST /api/login/admin/send-otp/` - Send admin OTP
- `POST /api/login/admin/verify-otp/` - Verify admin OTP

### Jobs
- `GET /api/jobs/` - List all jobs
- `POST /api/jobs/` - Create job (admin only)
- `GET /api/jobs/{id}/` - Get job details
- `PUT /api/jobs/{id}/` - Update job (admin only)

### Applications
- `POST /api/applications/` - Submit job application
- `GET /api/applications/` - List user applications
- `PUT /api/applications/{id}/` - Update application status (admin)

### Students
- `GET /api/students/` - List all students (admin)
- `GET /api/students/{id}/` - Get student profile
- `PUT /api/students/{id}/` - Update student profile

## ⚙️ Configuration

### CORS Settings

Update `CORS_ALLOWED_ORIGINS` in `settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://your-frontend-domain.vercel.app",
]
```

### Email Configuration

The project uses SendGrid for email delivery. Configure in `settings.py`:
```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'apikey'
EMAIL_HOST_PASSWORD = os.environ.get('SENDGRID_API_KEY')
```

### File Storage

Cloudinary is used for resume storage:
```python
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
```

## 🐛 Troubleshooting

### Email Issues
- **OTP emails in spam**: Normal for Gmail. Domain authentication recommended for production
- **Timeout errors**: Switch to SendGrid HTTP API instead of SMTP
- **Not receiving emails**: Check SendGrid sender verification

### File Upload Issues
- **404 on resume access**: Ensure Cloudinary is properly configured
- **Old files not accessible**: Re-upload files after Cloudinary setup
- **Upload fails**: Check Cloudinary API credentials

### CORS Errors
- Ensure frontend URL is in `CORS_ALLOWED_ORIGINS`
- Check that `corsheaders` middleware is properly positioned
- Add frontend domain to `CSRF_TRUSTED_ORIGINS`

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributors

- Tanish Chowdhury
- Aadi Bhardwaj

## 🙏 Acknowledgments

- Django and React communities for excellent documentation
- SendGrid and Cloudinary for reliable services

## 📞 Support

For issues and questions, please open an issue on GitHub or contact [tanish.chowdhury0310@gmail.com]

---

**Note**: Remember to check spam folder for OTP emails during testing. For production, configure domain authentication with SendGrid for better email deliverability.
