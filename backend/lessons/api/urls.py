from django.urls import path
from .views import CreateLesson

urlpatterns = [
    path('<int:pk>', CreateLesson.as_view()),
]
