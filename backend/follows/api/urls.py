from django.urls import path
from .views import createFollowAPI, viewFollowersAPI, viewFollowingsAPI

urlpatterns = [
    path('createFollow', createFollowAPI.as_view(), name='createFollow'),
    path('followers', viewFollowersAPI.as_view(), name='followers'),
    path('followings', viewFollowingsAPI.as_view(), name='followings'),
]
