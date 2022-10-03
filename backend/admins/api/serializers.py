from email import message
from django.core.validators import MinLengthValidator, MinValueValidator, RegexValidator
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from users.models import User
from admins.models import Category, Question


class AdminSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    total_questions = serializers.IntegerField(required=False, default=0)

    class Meta:
        model = Category
        fields = "__all__"
        extra_kwargs = {
                'title': {
                    'validators': [
                        UniqueValidator(
                            queryset=Category.objects.all(), message=("Title already exists.")
                        ),
                        MinLengthValidator(limit_value=2, message=("Should be at least 2 characters long"))
                    ]
                },
                'description' :{
                    'validators': [MinLengthValidator(limit_value=10, message=("It should be 10 characters long"))]
                },
                'total_questions' :{
                    'validators': [MinValueValidator(limit_value=0)]
                }
            }

class QuestionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Question
        fields = "__all__"
        extra_kwargs = {
                'word': {
                    'validators': [
                        UniqueValidator(
                            queryset=Question.objects.all()
                        ),
                        MinLengthValidator(limit_value=1),
                        RegexValidator(r'[^0-9]+$', 'Letters Only')
                    ]
                },
                'correct_answer': {
                    'validators': [
                        MinLengthValidator(limit_value=1)
                    ]
                },
            }
