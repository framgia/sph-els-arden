from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.db import IntegrityError
from django.contrib.contenttypes.models import ContentType
from activities.models import Activity

from admins.models import Category, Question
from profiles.models import Profile
from lessons.models import Answer, Lesson
from profiles.api.serializers import LearnedWordSerializer
from .serializers import CreateLessonSerializer, AnswerSerializer, UpdateAnswerSerializer, NestedAnswerSerializer
from admins.api.serializers import CategorySerializer, QuestionSerializer

class CreateLesson(APIView):
    def post(self, request, pk):
        try:
            Category.objects.get(id=pk)
        except Category.DoesNotExist:
            return Response({'message': "This category does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        profile = Profile.objects.get(user_id=request.user.id)
        print(profile.id)
        load = {
            'profile_id' : profile.id,
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

class CategoriesView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class QuestionsTable(ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_queryset(self):
        return self.queryset.filter(
            category_id=self.kwargs['pk']
        )

class QuizAnswer(APIView):
    def post(self, request, pk):
        # pk is question id
        answer = request.data['answer']
        correct=False

        try:
            question = Question.objects.get(id=pk)
        except Question.DoesNotExist:
            return Response({'error':'question does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        if(answer==question.correct_answer):
            correct = True

        newAnswer = AnswerSerializer(data = {
            'lesson_id' : request.data['lesson_id'],
            'question_id' : pk,
            'answer' : answer,
            'correct' : correct
            }
        )

        if newAnswer.is_valid():
            newAnswer.save()
            updateLessonProgress(request.data['lesson_id'])
            if(correct):
                addLearnedWord(request.user.id, question.word, answer)
            return Response(newAnswer.data, status=status.HTTP_201_CREATED)
        else:
            existingAnswer = Answer.objects.get(lesson_id=request.data['lesson_id'], question_id=pk)
            updateAnswer = UpdateAnswerSerializer(existingAnswer, data = {
                'answer' : answer,
                'correct' : correct
                }
            )
            if updateAnswer.is_valid():
                updateAnswer.save()
                updateLessonProgress(request.data['lesson_id'])
                if(correct):
                    addLearnedWord(request.user.id, question.word, answer)
                return Response(updateAnswer.validated_data, status=status.HTTP_200_OK)
        return Response({'error':'invalid data'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk):
        # pk is lesson id
        response_load = []
        answers = Answer.objects.filter(lesson_id=pk)

        for answer in answers:
            serialized = NestedAnswerSerializer(answer)
            response_load.append(serialized.data)
        return Response(response_load, status=status.HTTP_200_OK)


def updateLessonProgress(id):
    lesson = Lesson.objects.get(id=id)
    category = Category.objects.get(id=lesson.category_id.id)
    totalQuestions = category.total_questions

    allCorrectAnswer = Answer.objects.filter(lesson_id=id, correct=True).count()
    progress = float("{:.2f}".format(allCorrectAnswer/totalQuestions))
    lesson.progress = progress
    lesson.completed = True if progress==1.0 else False
    lesson.save()

def addLearnedWord(id, word, answer):
    try:
        addWord = LearnedWordSerializer(data={'user_id': id,'word':word, 'answer':answer})
        if addWord.is_valid():
            addWord.save()
    except:
        return