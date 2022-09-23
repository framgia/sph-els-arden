from django.urls import path
from .views import CategoriesTable, SingleCategory

urlpatterns = [
    path('categories', CategoriesTable.as_view(), name='allCategories'),
    path('category/<int:pk>', SingleCategory.as_view(), name='singleCategory'),
]
