from email.policy import default
from django.db import models
from users.models import User

class Profile(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user')
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    total_lessons_learned = models.IntegerField(default=0)
    total_words_learned = models.IntegerField(default=0)

    def __int__(self):
        return self.user_id
