from rest_framework import serializers
from generic_relations.relations import GenericRelatedField

from follows.models import Follow
from lessons.models import Lesson
from activities.models import Activity
from follows.api.serializers import FollowSerializer
from lessons.api.serializers import LessonSerializer

class ActivitySerializer(serializers.ModelSerializer):
    content_object = GenericRelatedField({
        Lesson: LessonSerializer(),
        Follow: FollowSerializer()
    })

    class Meta:
        model = Activity
        fields = "__all__"
