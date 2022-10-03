from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import IntegrityError
from django.contrib.contenttypes.models import ContentType
from activities.models import Activity

from lessons.models import Lesson
from admins.models import Category
from .serializers import CreateLessonSerializer

class CreateLesson(APIView):
    def post(self, request, pk):
        try:
            Category.objects.get(id=pk)
        except Category.DoesNotExist:
            return Response({'message': "This category does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        load = {
            'user_id' : request.user.id,
            'category_id' : pk
        }
        serializer = CreateLessonSerializer(data=load)
        if serializer.is_valid():
            try:
                lessonObj = serializer.save()
                activity = Activity(
                    content_type = ContentType.objects.get_for_model(lessonObj), 
                    object_id = lessonObj.id
                )
                activity.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                Response({'error':'duplicate entry'},status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
