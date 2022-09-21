from django.urls import path
from .views import createProfileAPI, updateProfileAPI, AvatarUploadAPI

urlpatterns = [
    path('createProfile', createProfileAPI.as_view(), name='createProfile'),
    path('updateProfile/<int:pk>', updateProfileAPI.as_view(), name='updateProfile'),
    path('uploadAvatar/<int:pk>', AvatarUploadAPI.as_view(), name='uploadAvatar'),
]
