from django.urls import path
from .views import CreateLesson, CategoriesView

urlpatterns = [
    path('/<int:pk>', CreateLesson.as_view()),
    path('/categories', CategoriesView.as_view()),
]
