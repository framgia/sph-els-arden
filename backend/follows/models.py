from email.policy import default
from django.db import models
from profiles.models import Profile

class Follow(models.Model):
    follower_id = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='follower')
    following_id = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='following')
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['follower_id', 'following_id'], name="unique_follow")
        ]

