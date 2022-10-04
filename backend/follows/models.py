from email.policy import default
from django.db import models
from profiles.models import Profile
from django.contrib.contenttypes.fields import GenericRelation
from activities.models import Activity

class Follow(models.Model):
    follower_id = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='follower')
    following_id = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='following')
    date = models.DateTimeField(auto_now_add=True)

    activity_logs = GenericRelation(Activity ,content_type_field='content_type',
        object_id_field='object_id', related_query_name='follow')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['follower_id', 'following_id'], name="unique_follow")
        ]
