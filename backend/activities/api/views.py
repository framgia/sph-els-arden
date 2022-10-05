from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q

from profiles.models import Profile
from activities.models import Activity
from .serializers import ActivitySerializer


class GetAllActivitiesAPI(APIView):
    def get(self, request):
        response_load = {}
        count =0

        activities = Activity.objects.all().order_by('activity_date')
        for activity in activities:
            serialized = ActivitySerializer(activity)
            response_load[count] = serialized.data
            count +=1
        return Response(response_load, status=status.HTTP_400_BAD_REQUEST)

class GetActivitiesAPI(APIView):
    def get(self, request, pk):
        profile = Profile.objects.get(user_id=pk)

        response_load = {}
        count =0

        activities = Activity.objects.filter(Q(lesson__profile_id=profile.id) | Q(follow__follower_id=profile.id)).order_by('-activity_date')
        for activity in activities:
            serialized = ActivitySerializer(activity)
            response_load[count] = serialized.data
            count +=1
        return Response(response_load, status=status.HTTP_200_OK)
