from django.contrib import admin
from .models import Category, Question

# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "title")

class QuestionAdmin(admin.ModelAdmin):
    list_display = ("id", "word", "correct_answer")

admin.site.register(Category, CategoryAdmin)
admin.site.register(Question, QuestionAdmin)
