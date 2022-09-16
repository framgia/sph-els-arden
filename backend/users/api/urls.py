from django.urls import path
from .views import RegisterAPI, LoginAPI, LogoutAPI, UserAPI

urlpatterns = [
    path('register', RegisterAPI.as_view(), name='register')
]
