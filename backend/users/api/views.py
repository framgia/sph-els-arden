from email import message
from rest_framework import exceptions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.hashers import make_password
import jwt, datetime

from .serializers import UserSerializer
from users.models import User

JWT_SECRET = "sels-project"

class RegisterAPI(APIView):

    def post(self, request):

        # hash the password
        hashedPassword = make_password(request.data["password"])
        request.data["password"] = hashedPassword
        print(request.data["password"])


        serializer = UserSerializer(data=request.data)

        # check validity of the given data before saving
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPI(APIView):
    def post(self, request):
        if not request.data:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        email = request.data['email']
        password = request.data['password']

        # filter using unique email
        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("This user doesn not exist!")
        
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password!")

        # start creating jwt
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),  # 60 min validity of token
            'iat': datetime.datetime.utcnow(),
        }

        token = jwt.encode(payload, JWT_SECRET, algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)  # set it to cookie
        response.data = {
            'jwt': token,
        }

        return response

class LogoutAPI(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'logout success'
        }

        return response

# get info of logged in user
class UserAPI(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("Unauthenticated!")

        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Session expired!")
        
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)
