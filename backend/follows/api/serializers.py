from rest_framework import serializers

from follows.models import Follow
from profiles.api.serializers import NestedProfileSerializer

class FollowSerializer(serializers.ModelSerializer):
    unique_together = [['follower_id', 'following_id']]

    class Meta:
        model = Follow
        fields = "__all__"

class NestedFollowSerializer(serializers.ModelSerializer):
    follower_id = NestedProfileSerializer()
    following_id = NestedProfileSerializer()
    unique_together = [['follower_id', 'following_id']]

    class Meta:
        model = Follow
        fields = "__all__"
