from secrets import choice
from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from users.models import User

class Activity(models.Model):
    activity_date = models.DateTimeField(auto_now_add=True)

    # for polymorphism
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
