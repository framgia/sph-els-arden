from django.urls import path
from .views import createFollowAPI, viewFollowersAPI, viewFollowingsAPI, deleteFollowAPI

urlpatterns = [
    path('createFollow', createFollowAPI.as_view(), name='createFollow'),
    path('followers/<int:pk>', viewFollowersAPI.as_view(), name='followers'),
    path('followings/<int:pk>', viewFollowingsAPI.as_view(), name='followings'),
    path('deleteFollow', deleteFollowAPI.as_view(), name='deleteFollow'),
]
