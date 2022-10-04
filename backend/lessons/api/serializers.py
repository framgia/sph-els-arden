from  rest_framework.validators import UniqueTogetherValidator
from rest_framework import serializers
from lessons.models import Lesson


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
                fields=['user_id', 'category_id'], 
                message=("Lesson is already taken.")
            )
        ]
