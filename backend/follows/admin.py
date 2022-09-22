from django.contrib import admin
from .models import Follow

class FollowAdmin(admin.ModelAdmin):
    list_display = ("id", "follower_id", "following_id")

admin.site.register(Follow, FollowAdmin)
