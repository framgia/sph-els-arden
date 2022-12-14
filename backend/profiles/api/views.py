from msilib.schema import AppId
import profile
from signal import valid_signals
from urllib import response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from rest_framework.permissions import AllowAny
from sels.settings import MEDIA_URL

from profiles.models import Profile, LearnedWord
from users.models import User
from follows.models import Follow
from .serializers import NestedProfileSerializer, ProfileSerializer, AvatarSerializer, LearnedWordSerializer
from users.api.serializers import UserProfileSerializer, UserProfileUpdateSerializer
from utils.jwt_payload import getJWTPayload

class updateProfileAPI(APIView):
    def patch(self, request, pk):
        try:
            profile = Profile.objects.get(pk=pk)
        except Profile.DoesNotExist:
            return Response({'message': "this profile does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': "incomplete data"}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data
        try:
            user = User.objects.get(id=request.user.id)
            userProfileSerializer = UserProfileUpdateSerializer(user, data=data['user'])
            data['user_id']=request.user.id
            profileSerializer = ProfileSerializer(profile, data=data)
        except User.DoesNotExist:
            return Response({'message': "this user does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': "incomplete data"},status=status.HTTP_400_BAD_REQUEST)


        if (userProfileSerializer.is_valid() and profileSerializer.is_valid()):
            userProfileSerializer.save()
            profileSerializer.save()
            return Response((profileSerializer.data, userProfileSerializer.data), status=status.HTTP_201_CREATED)
        elif (not userProfileSerializer.is_valid()):
            return Response(userProfileSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif (not profileSerializer.is_valid()):
            return Response(profileSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class AvatarUploadAPI(APIView):
    def post(self, request, pk):
        data = request.data
        try:
            profile = Profile.objects.get(pk=pk)
        except Profile.DoesNotExist:
            return Response({'message': "this profile does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': "incomplete data"}, status=status.HTTP_400_BAD_REQUEST)
        
        avatarSerializer = AvatarSerializer(profile, data=data)

        if (avatarSerializer.is_valid()):
            avatarSerializer.save()
            return Response(avatarSerializer.data,status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class viewProfile(APIView):
    def get(self, request):
        domain = request.META['HTTP_HOST']
        payload = getJWTPayload(request)
        serializedProfile = ProfileSerializer(Profile.objects.get(user_id=payload['id']))
        profile = serializedProfile.data
        if(profile['avatar'] != ""):
            profile['avatar'] = domain+serializedProfile.data['avatar']
        user = UserProfileSerializer(User.objects.get(id=payload['id']))

        follower = Follow.objects.filter(following_id=serializedProfile.data['id']).count()
        following = Follow.objects.filter(follower_id=serializedProfile.data['id']).count()

        response_load = {**profile,  **user.data, 'follower': follower, 'following': following}

        return Response(response_load, status=status.HTTP_200_OK)

class viewOtherProfile(APIView):
    def get(self, request, pk):
        domain = request.META['HTTP_HOST']
        isFollowing = False

        try:
            viewerProfile = Profile.objects.get(user_id=request.user.id)
            viewingProfile = Profile.objects.get(user_id=pk)
            serializedProfile = ProfileSerializer(viewingProfile)
            profile = serializedProfile.data
            if(profile['avatar'] != "" and profile['avatar'] is not None):
                profile['avatar'] = domain+serializedProfile.data['avatar']
            user = UserProfileSerializer(User.objects.get(id=pk))

            follower = Follow.objects.filter(following_id=serializedProfile.data['id']).count()
            following = Follow.objects.filter(follower_id=serializedProfile.data['id']).count()
            
            try:
                followObj = Follow.objects.get(follower_id=viewerProfile.id, following_id=viewingProfile.id)
                isFollowing = True
            except Follow.DoesNotExist:
                isFollowing = False

        except Profile.DoesNotExist or User.DoesNotExist:
            return Response({'message': "this profile does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        response_load = {**profile,  **user.data, 'follower': follower, 'following': following, 'follow': isFollowing}

        return Response(response_load, status=status.HTTP_200_OK)

class LearnedWordsTable(ListCreateAPIView):
    queryset = LearnedWord.objects.all()
    serializer_class = LearnedWordSerializer

    def get_queryset(self):
        return self.queryset.filter(
            user_id=self.kwargs['pk']
        )

class ProfilePageData(APIView):
    def get(self, request, pk):
        response_load = {}
        follow = {'follow': False}
        if(pk==request.user.id): viewingOwn = {'viewingOwn': True}
        else : viewingOwn = {'viewingOwn': False}
        visitor = Profile.objects.get(user_id=request.user.id)
        profile = ProfileSerializer(Profile.objects.get(user_id=pk))
        user = UserProfileSerializer(User.objects.get(id=pk))
        followers = Follow.objects.filter(following_id=profile.data['id']).values('follower_id')
        for follower in followers:
            if(follower['follower_id'], visitor.id):
                follow = {'follow':True}
                break
        response_load['followers'] = followers.count()
        response_load['following'] = Follow.objects.filter(follower_id=profile.data['id']).values('following_id').count()
        response_load.update(profile.data)
        response_load.update(user.data)
        response_load.update(follow)
        response_load.update(viewingOwn)
        
        return Response(response_load, status=status.HTTP_200_OK)
