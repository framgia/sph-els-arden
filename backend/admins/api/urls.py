from django.urls import path
from .views import CategoriesTable, SingleCategory, CreateQuestionAPI, ViewUpdateDeleteQuestionAPI, CategoryQuestions, ViewUsers

urlpatterns = [
    path('categories', CategoriesTable.as_view()),
    path('category/<int:pk>', SingleCategory.as_view()),
    path('question/<int:pk>', ViewUpdateDeleteQuestionAPI.as_view()),
    path('question', CreateQuestionAPI.as_view()),
    path('category/<int:pk>/questions', CategoryQuestions.as_view()),
    path('users', ViewUsers.as_view()),
]
