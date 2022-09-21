from django.urls import path
from .views import createFollowAPI

urlpatterns = [
    path('createFollow', createFollowAPI.as_view(), name='createFollow'),
]
