from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model

class StudentAuthenticationBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            # Try to get the user by email
            user = get_user_model().objects.get(email=email)
            if user.check_password(password):  # Check if the password matches
                return user
        except get_user_model().DoesNotExist:
            return None  # Return None if user does not exist
