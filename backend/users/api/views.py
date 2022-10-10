from email import message
from rest_framework import exceptions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import BasePermission, IsAuthenticated, AllowAny
from django.contrib.auth.hashers import make_password
import jwt, datetime

from sels.settings import MEDIA_URL
from .serializers import UserSerializer
from users.models import User
from profiles.models import Profile
from profiles.api.serializers import ProfileSerializer

JWT_SECRET = "sels-project"

class RegisterAPI(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        hashedPassword = make_password(request.data["password"])
        request.data["password"] = hashedPassword


        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            profileSerializer = ProfileSerializer(data={'user_id': serializer.data['id']})
            if profileSerializer.is_valid():
                profileSerializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPI(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        if not request.data:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        email = request.data['email']
        password = request.data['password']

        user = User.objects.get(email=email)

        if user is None:
            raise AuthenticationFailed("This user doesn not exist!")
        
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password!")

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=3),
            'iat': datetime.datetime.utcnow(),
        }

        token = jwt.encode(payload, JWT_SECRET, algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True, samesite='None', secure=True)
        response.data = {
            'jwt': token,
            'is_admin': user.is_superuser
        }

        return response

class LogoutAPI(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie(key='jwt', samesite='None')
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
        
        user = User.objects.get(id=payload['id'])
        serializer = UserSerializer(user)

        return Response(serializer.data)

class ViewUsers(APIView):
    def get(self, request):
        domain = request.META['HTTP_HOST']
        avatarPrefix = domain+MEDIA_URL

        response_load = {}
        count = 0
        profiles = Profile.objects.all().values()

        for profile in profiles:
            entry= {}
            user = User.objects.get(id=profile['user_id_id'])
            userSerialized = UserSerializer(user)
            profile['avatar'] = avatarPrefix+profile['avatar']
            entry['profile'] = profile
            entry['user'] = userSerialized.data
            response_load[count] = entry
            count+=1

        return Response(response_load, status=status.HTTP_200_OK)
