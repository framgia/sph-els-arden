from turtle import title
from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=100, blank=False, unique=True)
    description = models.TextField(blank=False)
    total_questions = models.IntegerField()

    def __int__(self):
        return self.title

class Question(models.Model):
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='word')
    word = models.CharField(max_length=50, blank=False, unique=True)
    correct_answer = models.CharField(max_length=50, blank=False)
    choice_1 = models.CharField(max_length=50, blank=False)
    choice_2 = models.CharField(max_length=50, blank=False)
    choice_3 = models.CharField(max_length=50, blank=False)

    def __int__(self):
        return self.word
