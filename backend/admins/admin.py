from django.contrib import admin
from .models import Category, Question
from safedelete.admin import SafeDeleteAdmin, SafeDeleteAdminFilter

# Register your models here.
class CategoryAdmin(SafeDeleteAdmin):
    list_display = ("id", "title")
    list_filter = (SafeDeleteAdminFilter,) + SafeDeleteAdmin.list_filter

class QuestionAdmin(SafeDeleteAdmin):
    list_display = ("id", "word", "correct_answer")
    list_filter = (SafeDeleteAdminFilter,) + SafeDeleteAdmin.list_filter

admin.site.register(Category, CategoryAdmin)
admin.site.register(Question, QuestionAdmin)
