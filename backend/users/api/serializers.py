from dataclasses import fields
import email
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from users.models import User

class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = "__all__"

class UserProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)

    class Meta:
        model = User
        fields = ('first_name','last_name','email')

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(required=False, write_only=True)

    class Meta:
        model = User
        fields = ('first_name','last_name','email', 'password')

    def update(self, instance, validated_data):
        user = super().update(instance, validated_data)
        try:
            user.set_password((validated_data['password']))
            user.save()
        except KeyError:
            pass
        return user
