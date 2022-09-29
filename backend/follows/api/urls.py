from django.urls import path
from .views import createFollowAPI, viewFollowersAPI, viewFollowingsAPI, deleteFollowAPI

urlpatterns = [
    path('<int:pk>/create', createFollowAPI.as_view()),
    path('followers/<int:pk>', viewFollowersAPI.as_view()),
    path('followings/<int:pk>', viewFollowingsAPI.as_view()),
    path('<int:pk>/delete', deleteFollowAPI.as_view()),
]
