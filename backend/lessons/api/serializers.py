from  rest_framework.validators import UniqueTogetherValidator
from rest_framework import serializers
from lessons.models import Lesson, Answer
from admins.api.serializers import CategorySerializer, QuestionSerializer
from profiles.api.serializers import NestedProfileSerializer


class LessonSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Lesson
        fields = "__all__"

class CreateLessonSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    progress = serializers.FloatField(required=False)
    completed = serializers.BooleanField(required=False)

    class Meta:
        model = Lesson
        fields = "__all__"
        validators = [
            UniqueTogetherValidator(
                queryset=Lesson.objects.all(),
                fields=['profile_id', 'category_id'], 
                message=("Lesson is already taken.")
            )
        ]

class NestedLessonSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    profile_id = NestedProfileSerializer()
    category_id = CategorySerializer()

    class Meta:
        model = Lesson
        fields = "__all__"

class AnswerSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Answer
        fields = "__all__"
        validators = [
            UniqueTogetherValidator(
                queryset=Answer.objects.all(),
                fields=['question_id', 'lesson_id'], 
                message=("Already answered")
            )
        ]

class NestedAnswerSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    question_id = QuestionSerializer()

    class Meta:
        model = Answer
        fields = "__all__"

class UpdateAnswerSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    question_id = serializers.IntegerField(read_only=True)
    lesson_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Answer
        fields = "__all__"
