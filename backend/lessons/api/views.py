from urllib import response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.contrib.contenttypes.models import ContentType
from django.forms.models import model_to_dict
import random

from activities.models import Activity
from admins.models import Category, Question
from profiles.models import Profile
from lessons.models import Answer, Lesson
from profiles.api.serializers import LearnedWordSerializer
from .serializers import CreateLessonSerializer, AnswerSerializer, LessonSerializer, NestedLessonSerializer, UpdateAnswerSerializer, NestedAnswerSerializer
from admins.api.serializers import CategorySerializer, QuestionSerializer

class CreateLesson(APIView):
    def post(self, request, pk):
        try:
            category =Category.objects.get(id=pk)
        except Category.DoesNotExist:
            return Response({'message': "This category does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        profile = Profile.objects.get(user_id=request.user.id)
        load = {
            'profile_id' : profile.id,
            'category_id' : pk
        }
        serializer = CreateLessonSerializer(data=load)
        if serializer.is_valid():
            response_load = organizeQuestion(category)
            try:
                lessonObj = serializer.save()
                response_load['id'] = lessonObj.id
                activity = Activity(
                    content_type = ContentType.objects.get_for_model(lessonObj), 
                    object_id = lessonObj.id
                )
                activity.save()
                return Response(response_load, status=status.HTTP_201_CREATED)
            except:
                Response({'error':'duplicate entry'},status=status.HTTP_400_BAD_REQUEST)
        existingLesson = model_to_dict(Lesson.objects.get(profile_id=profile.id, category_id=pk))
        serializedExisting =LessonSerializer(data = existingLesson)
        if serializedExisting.is_valid():
            response_load = organizeQuestion(category)
            response_load['id'] = existingLesson['id']
            response_load['progress'] = existingLesson['completed']
            response_load['completed'] = existingLesson['completed']
            return Response(response_load, status=status.HTTP_200_OK)
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
        response_load = {}
        answers_load = []
        answers = Answer.objects.filter(lesson_id=pk)
        response_load['lesson'] = NestedLessonSerializer(Lesson.objects.get(id=pk)).data

        for answer in answers:
            serialized = NestedAnswerSerializer(answer)
            answers_load.append(serialized.data)

        response_load['answers'] = answers_load
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
def organizeQuestion(category):
    response_load = {}
    questions_load = []
    questions = Question.objects.filter(category_id=category.id)
    for question in questions:
        serializedQuestion= QuestionSerializer(question).data
        choices = [
            serializedQuestion['choice_1'],
            serializedQuestion['choice_2'],
            serializedQuestion['choice_3'],
            serializedQuestion['correct_answer']
        ]
        random.shuffle(choices)
        serializedQuestion.pop('choice_1')
        serializedQuestion.pop('choice_2')
        serializedQuestion.pop('choice_3')
        serializedQuestion['choices'] = choices
        questions_load.append(serializedQuestion)
    response_load['questions'] = (questions_load)
    response_load['category'] = CategorySerializer(category).data
    return response_load
