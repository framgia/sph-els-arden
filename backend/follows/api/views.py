from distutils.log import error
from email.policy import HTTP
from sqlite3 import IntegrityError
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import IntegrityError

from .serializers import FollowSerializer

class createFollowAPI(APIView):
    def post(self, request):
        serializer = FollowSerializer(data=request.data)

        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                Response({'message':'duplicate entry'},status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
