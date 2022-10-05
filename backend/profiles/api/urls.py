from django.urls import path
from .views import createProfileAPI, updateProfileAPI, AvatarUploadAPI, viewProfile, viewOtherProfile, LearnedWordsTable, ProfilePageData

urlpatterns = [
    path('/createProfile', createProfileAPI.as_view(), name='createProfile'),
    path('/updateProfile/<int:pk>', updateProfileAPI.as_view(), name='updateProfile'),
    path('/uploadAvatar/<int:pk>', AvatarUploadAPI.as_view(), name='uploadAvatar'),
    path('/profile', viewProfile.as_view(), name='profile'),
    path('/profile/<int:pk>', viewOtherProfile.as_view(), name='otherProfile'),
    path('/<int:pk>/words', LearnedWordsTable.as_view()),
    path('/data/<int:pk>', ProfilePageData.as_view()),
]
