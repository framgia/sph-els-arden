from django.urls import path
from .views import CategoriesTable, SingleCategory, CreateQuestionAPI, UpdateQuestionAPI, DeleteQuestionAPI, CategoryQuestions

urlpatterns = [
    path('categories', CategoriesTable.as_view(), name='allCategories'),
    path('category/<int:pk>', SingleCategory.as_view(), name='singleCategory'),
    path('createQuestion', CreateQuestionAPI.as_view(), name='createQuestion'),
    path('updateQuestion/<int:pk>', UpdateQuestionAPI.as_view(), name='updateQuestion'),
    path('deleteQuestion/<int:pk>', DeleteQuestionAPI.as_view(), name='deleteQuestion'),
    path('categoryQuestions/<int:pk>', CategoryQuestions.as_view(), name='categoryQuestions'),
]
