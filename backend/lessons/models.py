from email.policy import default
from django.db import models
from users.models import User
from admins.models import Category

class Lesson(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    progress = models.FloatField(default=0)
    completed = models.BooleanField(default=False)

