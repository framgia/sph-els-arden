from rest_framework.response import Response
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
import jwt
from sels.settings import JWT_SECRET, JWT_ALGORITHM

from users.models import User

class Auth(BaseAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            return None

        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGORITHM)
        except jwt.ExpiredSignatureError:
            return None

        try:
            user = User.objects.get(id=payload['id'])
        except:
            return None
        return (user, None)
