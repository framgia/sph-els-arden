from rest_framework import exceptions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserSerializer

class RegisterAPI(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        # check validity of the given data before saving
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)