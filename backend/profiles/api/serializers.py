from dataclasses import fields
from rest_framework import serializers

from profiles.models import Profile, LearnedWord
from users.api.serializers import UserProfileSerializer

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    total_words_learned = serializers.IntegerField(read_only=True)
    total_lessons_learned = serializers.IntegerField(read_only=True)

    class Meta:
        model = Profile
        fields = "__all__"

class ProfileIDSSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('id', 'user_id')

class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'avatar')

class LearnedWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearnedWord
        fields = "__all__"

class NestedProfileSerializer(serializers.ModelSerializer):
    user_id = UserProfileSerializer()
    total_words_learned = serializers.IntegerField(read_only=True)
    total_lessons_learned = serializers.IntegerField(read_only=True)

    class Meta:
        model = Profile
        fields = "__all__"
