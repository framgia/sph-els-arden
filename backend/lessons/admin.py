from django.contrib import admin
from .models import Lesson

# Register your models here.
class LessonAdmin(admin.ModelAdmin):
    list_display = ("id", "user_id", "category_id")

admin.site.register(Lesson, LessonAdmin)
