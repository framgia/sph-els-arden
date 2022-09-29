from dataclasses import fields
from distutils.log import error
from email.policy import HTTP
from sqlite3 import IntegrityError
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist

from .serializers import FollowSerializer
from profiles.api.serializers import ProfileSerializer
from users.api.serializers import UserProfileSerializer
from follows.models import Follow
from profiles.models import Profile
from users.models import User
from utils.jwt_payload import getJWTPayload

class createFollowAPI(APIView):
    def post(self, request):
        serializer = FollowSerializer(data=request.data)

        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                Response({'message':'duplicate entry'},status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class viewFollowersAPI(APIView):
    def get(self, request, pk):
        response_load = {}
        count =0
        payload = getJWTPayload(request)

        try:
            user_profile = Profile.objects.get(user_id=pk)
            followers = Follow.objects.filter(following_id=user_profile.id).values('follower_id')
            
            for follower in followers:
                entry = {}
                follower_id = follower["follower_id"]
                follower_profile = ProfileSerializer(Profile.objects.get(id=follower_id))
                follower_user_id = follower_profile.data['user_id']
                follower_user = UserProfileSerializer(User.objects.get(id=follower_user_id))
                entry['profile'] = follower_profile.data
                entry['user'] = follower_user.data
                response_load[count] = entry
                count +=1
            return Response(response_load, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(response_load, status=status.HTTP_400_BAD_REQUEST)

class viewFollowingsAPI(APIView):
    def get(self, request, pk):
        response_load = {}
        count = 0
        payload = getJWTPayload(request)

        try:
            user_profile = Profile.objects.get(user_id=pk)
            followings = Follow.objects.filter(follower_id=user_profile.id).values('following_id')

            for following in followings:
                entry= {}
                following_id = following["following_id"]
                following_profile = ProfileSerializer(Profile.objects.get(id=following_id))
                following_user_id = following_profile.data['user_id']
                following_user = UserProfileSerializer(User.objects.get(id=following_user_id))
                entry['profile'] = following_profile.data
                entry['user'] = following_user.data
                response_load[count] = entry

                count+=1

            return Response(response_load, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(response_load, status=status.HTTP_400_BAD_REQUEST)

class deleteFollowAPI(APIView):
    def delete(self, request):
        following_id = request.data["following_id"]
        follower_id = request.data["follower_id"]

        try:
            followObj = Follow.objects.filter(follower_id=follower_id, following_id=following_id)
            followObj.delete()
            return Response(status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
