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
from activities.models import Activity
from django.contrib.contenttypes.models import ContentType

class createFollowAPI(APIView):
    def post(self, request, pk):
        follower = Profile.objects.get(user_id=request.user.id)
        following = Profile.objects.get(id=pk)

        serializer = FollowSerializer(data={'follower_id':follower.id, 'following_id':following.id})

        if serializer.is_valid():
            try:
                followObj = serializer.save()
                activity = Activity(
                    content_type = ContentType.objects.get_for_model(followObj), 
                    object_id = followObj.id
                )
                activity.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                Response({'message':'duplicate entry'},status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class viewFollowersAPI(APIView):
    def get(self, request, pk):
        response_load = {}
        count =0

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
    def delete(self, request, pk):
        current_profile = Profile.objects.get(user_id=request.user.id)

        try:
            followObj = Follow.objects.get(follower_id=current_profile.id, following_id=pk)
            followObj.delete()
            return Response(status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
