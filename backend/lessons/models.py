from email.policy import default
from django.db import models
from users.models import User
from admins.models import Category
from profiles.models import Profile
from django.contrib.contenttypes.fields import GenericRelation
from activities.models import Activity

class Lesson(models.Model):
    profile_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    progress = models.FloatField(default=0)
    completed = models.BooleanField(default=False)

    activity_logs = GenericRelation(Activity ,content_type_field='content_type',
        object_id_field='object_id', related_query_name='lesson')
