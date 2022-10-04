from django.urls import path
from .views import createProfileAPI, updateProfileAPI, AvatarUploadAPI, viewProfile, viewOtherProfile

urlpatterns = [
    path('/createProfile', createProfileAPI.as_view(), name='createProfile'),
    path('/updateProfile/<int:pk>', updateProfileAPI.as_view(), name='updateProfile'),
    path('/uploadAvatar/<int:pk>', AvatarUploadAPI.as_view(), name='uploadAvatar'),
    path('/profile', viewProfile.as_view(), name='profile'),
    path('/profile/<int:pk>', viewOtherProfile.as_view(), name='otherProfile'),
]
