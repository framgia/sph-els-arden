from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist

from admins.models import Category, Question
from users.models import User
from profiles.models import Profile
from .serializers import CategorySerializer, QuestionSerializer
from profiles.api.serializers import Profile
from users.api.serializers import UserProfileSerializer, UserSerializer

class CategoriesTable(ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]

class SingleCategory(RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]

class CreateQuestionAPI(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                category = Category.objects.get(id=request.data["category_id"])
                print(category)
                category.total_questions += 1
                category.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                Response({'error':'duplicate entry'},status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ViewUpdateDeleteQuestionAPI(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, pk):

        try:
            question = Question.objects.get(id=pk)
            serialized = QuestionSerializer(question)
            return Response(serialized.data, status=status.HTTP_200_OK)
        except Question.DoesNotExist:
            return Response({'error': "this question does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        try:
            question = Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            return Response({'message': "this question does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': "incomplete data"}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data
        serializer = QuestionSerializer(question, data=data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response((serializer.data), status=status.HTTP_200_OK)
            except:
                Response({'error':'incomplete data'},status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            question = Question.objects.get(pk=pk)
            category = Question.objects.filter(pk=pk).values('category_id')
            category_id=category[0]['category_id']
            category = Category.objects.get(id=category_id)
            category.total_questions -= 1
            category.save()
            question.delete()
            return Response(status=status.HTTP_200_OK)
        except Question.DoesNotExist:
            return Response({'error': "this question does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class CategoryQuestions(APIView):
    def get(self, request, pk):
        response_load = {}
        count =0
        try:
            questions = Question.objects.filter(category_id=pk)

            for question in questions:
                serialized = QuestionSerializer(question)
                response_load[count] = serialized.data
                count+=1
            return Response(response_load, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ViewUsers(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        response_load = {}
        count = 0
        profiles = Profile.objects.all().values()

        for profile in profiles:
            entry= {}
            user = User.objects.get(id=profile['user_id_id'])
            userSerialized = UserSerializer(user)
            print(userSerialized.data)
            entry['profile'] = profile
            entry['user'] = userSerialized.data
            response_load[count] = entry
            count+=1

        return Response(response_load, status=status.HTTP_200_OK)
