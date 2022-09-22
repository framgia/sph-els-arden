from rest_framework import serializers

from follows.models import Follow

class FollowSerializer(serializers.ModelSerializer):
    # follower_id = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    # following_id = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    unique_together = [['follower_id', 'following_id']]

    class Meta:
        model = Follow
        fields = "__all__"
