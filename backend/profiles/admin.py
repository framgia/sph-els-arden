from django.contrib import admin
from .models import Profile, LearnedWord

# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user_id", "avatar")

class LearnedWordAdmin(admin.ModelAdmin):
    list_display = ("id", "user_id", "word")

admin.site.register(Profile, ProfileAdmin)
admin.site.register(LearnedWord, LearnedWordAdmin)
