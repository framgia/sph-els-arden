from turtle import title
from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=100, blank=False, unique=True)
    description = models.TextField(blank=False)
    total_questions = models.IntegerField()

    def __int__(self):
        return self.title
