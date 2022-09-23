from turtle import title
from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField()
    total_questions = models.IntegerField()

    def __int__(self):
        return self.title
