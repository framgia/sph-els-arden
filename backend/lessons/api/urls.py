from django.urls import path
from .views import CreateLesson, CategoriesView, QuestionsTable

urlpatterns = [
    path('/<int:pk>', CreateLesson.as_view()),
    path('/categories', CategoriesView.as_view()),
    path('/<int:pk>/questions', QuestionsTable.as_view()),
]
