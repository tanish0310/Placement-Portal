"""
Django settings for backend project.
"""
import cloudinary
import cloudinary.uploader
import cloudinary.api
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-(urkwrx0a&h8lu6w&$9!!r(l7&#0hs+af7g)!^xo4zvzjr_e**')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'True') == 'True'

# Update ALLOWED_HOSTS for production
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '*').split(',')

# Application definition
INSTALLED_APPS = [
    # Django core apps FIRST
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party apps
    'rest_framework',
    'corsheaders',
    'cloudinary_storage',  # Before cloudinary
    'cloudinary',
    
    # Your apps LAST
    'core',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add this for static files
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# Database - Uses environment variables in production
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('MYSQLDB_NAME', 'placement_portal'),
        'USER': os.environ.get('MYSQLDB_USER', 'root'),
        'PASSWORD': os.environ.get('MYSQLDB_PASSWORD', 'king2918'),
        'HOST': os.environ.get('MYSQLDB_HOST', 'localhost'),
        'PORT': os.environ.get('MYSQLDB_PORT', '3306'),
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': os.environ.get('CLOUDINARY_CLOUD_NAME'),
    'API_KEY': os.environ.get('CLOUDINARY_API_KEY'),
    'API_SECRET': os.environ.get('CLOUDINARY_API_SECRET'),
}
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

# After your Cloudinary configuration
import logging
logger = logging.getLogger(__name__)

logger.info(f"CLOUDINARY_CLOUD_NAME: {os.environ.get('CLOUDINARY_CLOUD_NAME')}")
logger.info(f"CLOUDINARY_API_KEY: {os.environ.get('CLOUDINARY_API_KEY')[:10]}...")  # First 10 chars only
logger.info(f"DEFAULT_FILE_STORAGE: {DEFAULT_FILE_STORAGE}")

# Debug Cloudinary Configuration
import logging
logger = logging.getLogger(__name__)

logger.info(f"CLOUDINARY_CLOUD_NAME: {os.environ.get('CLOUDINARY_CLOUD_NAME')}")
logger.info(f"CLOUDINARY_API_KEY exists: {bool(os.environ.get('CLOUDINARY_API_KEY'))}")
logger.info(f"DEFAULT_FILE_STORAGE: {DEFAULT_FILE_STORAGE}")

# Debug Cloudinary Configuration
import logging
logger = logging.getLogger(__name__)

logger.info(f"CLOUDINARY_CLOUD_NAME: {os.environ.get('CLOUDINARY_CLOUD_NAME')}")
logger.info(f"CLOUDINARY_API_KEY exists: {bool(os.environ.get('CLOUDINARY_API_KEY'))}")
logger.info(f"DEFAULT_FILE_STORAGE: {DEFAULT_FILE_STORAGE}")

# Test if cloudinary is actually loaded
try:
    import cloudinary
    logger.info("Cloudinary module imported successfully")
except ImportError:
    logger.error("Cloudinary not installed!")
# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Use whitenoise for static files in production
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Media files (Uploads)
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS Configuration
# In production, this will be set via environment variable
CORS_ALLOWED_ORIGINS = os.environ.get(
    'CORS_ALLOWED_ORIGINS',
    'http://localhost:3000'
).split(',')

CORS_ALLOW_CREDENTIALS = True
CORS_EXPOSE_HEADERS = ["Content-Type", "X-CSRFToken"]

# CSRF Configuration
CSRF_TRUSTED_ORIGINS = os.environ.get(
    'CSRF_TRUSTED_ORIGINS',
    'http://localhost:3000'
).split(',')

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ]
}



# Remove this - it references a non-existent backend
# AUTHENTICATION_BACKENDS = [
#     'yourapp.authentication_backends.CustomAuthenticationBackend',
#     'django.contrib.auth.backends.ModelBackend',
# ]

# Email Configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'apikey'
EMAIL_HOST_PASSWORD = os.environ.get('SENDGRID_API_KEY')
EMAIL_TIMEOUT = 30
DEFAULT_FROM_EMAIL = os.environ.get('EMAIL_HOST_USER')
EMAIL_USE_LOCALTIME = False
EMAIL_SSL_CERTFILE = None
EMAIL_SSL_KEYFILE = None

# Security settings for production
if not DEBUG:
    # Trust Railway's proxy headers
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    
    # Be careful with SSL redirect - can cause loops
    # Only enable if Railway is properly configured
    SECURE_SSL_REDIRECT = False  # Set to False initially to avoid redirect loops
    
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SAMESITE = 'None'  # Important for cross-origin requests
    CSRF_COOKIE_SAMESITE = 'None'
    
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = 'DENY'





