from msilib.schema import AppId
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password

from profiles.models import Profile
from users.models import User
from .serializers import ProfileSerializer, AvatarSerializer
from users.api.serializers import UserProfileSerializer, UserProfileUpdateSerializer
from utils.jwt_payload import getJWTPayload

class createProfileAPI(APIView):
    def post(self, request):
        serializer = ProfileSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class updateProfileAPI(APIView):
    def patch(self, request, pk):
        try:
            profile = Profile.objects.get(pk=pk)
        except Profile.DoesNotExist:
            return Response({'message': "this profile does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': "incomplete data"}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data
        profileSerializer = ProfileSerializer(profile, data=data)
        try:
            user_data = data['user']
            user_id = data['user_id']
            user = User.objects.get(pk=user_id)
            userProfileSerializer = UserProfileUpdateSerializer(user, data=user_data)
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
        print(data)
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
        payload = getJWTPayload(request)
        profile = ProfileSerializer(Profile.objects.get(user_id=payload['id']))
        user = UserProfileSerializer(User.objects.get(id=payload['id']))

        response_load = {
            'profile': profile.data, 
            'user': user.data
        }

        return Response(response_load, status=status.HTTP_200_OK)

class viewOtherProfile(APIView):
    def get(self, request, pk):
        data = request.data
        try:
            # profile = Profile.objects.get(pk=pk)
            profile = ProfileSerializer(Profile.objects.get(user_id=pk))
            user = UserProfileSerializer(User.objects.get(id=pk))

        except Profile.DoesNotExist or User.DoesNotExist:
            return Response({'message': "this profile does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        response_load = {
            'profile': profile.data, 
            'user': user.data
        }

        return Response(response_load, status=status.HTTP_200_OK)
