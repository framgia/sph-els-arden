from django.urls import path
from .views import CreateLesson, CategoriesView, QuestionsTable, QuizAnswer

urlpatterns = [
    path('/<int:pk>', CreateLesson.as_view()),
    path('/categories', CategoriesView.as_view()),
    path('/<int:pk>/questions', QuestionsTable.as_view()),
    path('/answer/<int:pk>', QuizAnswer.as_view()),
    path('/<int:pk>/answered', QuizAnswer.as_view()),
]
