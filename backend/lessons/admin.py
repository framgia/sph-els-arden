from django.contrib import admin
from .models import Answer, Lesson

# Register your models here.
class LessonAdmin(admin.ModelAdmin):
    list_display = ("id", "profile_id", "category_id")

class AnswerAdmin(admin.ModelAdmin):
    list_display = ("id", "question_id", "lesson_id", "answer")

admin.site.register(Lesson, LessonAdmin)
admin.site.register(Answer, AnswerAdmin)
