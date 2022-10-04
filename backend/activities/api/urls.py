from django.urls import path
from .views import GetActivitiesAPI, GetAllActivitiesAPI

urlpatterns = [
    path('', GetAllActivitiesAPI.as_view()),
    path('<int:pk>', GetActivitiesAPI.as_view()),
]
