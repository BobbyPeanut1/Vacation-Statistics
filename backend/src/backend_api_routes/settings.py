
from pathlib import Path
from utils.app_config import AppConfig
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-^oo5l+nv85ft2q%8nt-(d+tapodtnv33b)s19(l0e@s*k_56%c'

DEBUG = True

ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Register our apps
    "api.apps.ApiConfig",

    # Register rest framework components
    "rest_framework",
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',


    # In the project we are going to be doing a Cross-Origin request
    # Which means we need to make an api request from our frontend(React) to our backend(Django), Requests from different domains are usually not allowed to do that
    # to counteract that we must install and enable CORS with the django-cors-headers package
    "corsheaders",

]

# Gives us the authentication capabilities through simpleJWT
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}


SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes = 5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days = 20), 
    'ROTATE_REFRESH_TOKENS': True,  
    'BLACKLIST_AFTER_ROTATION': True, 
}


# Allows us to set the default Django user model as our custom user model
AUTH_USER_MODEL = 'api.UsersModel'


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Configure CORS:
CORS_ALLOW_ALL_ORIGINS = True # Enable all websites. To enable specific websites instead: CORS_ALLOWED_ORIGINS = ["http://mysite.com", "http://another-site.com"]
CORS_ALLOW_CREDENTIALS = True # Allow sending Cookies in CORS (needed for maintaining server-side sessions)

ROOT_URLCONF = 'backend_api_routes.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend_api_routes.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'HOST': AppConfig.mysql_host,
        'USER': AppConfig.mysql_user,
        'PASSWORD': AppConfig.mysql_password,
        'NAME': AppConfig.mysql_database,
        'PORT': '3306',
        'OPTIONS': {
            'charset': 'utf8mb4',
        },
    }
}

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


LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
