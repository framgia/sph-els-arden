from rest_framework import serializers
from generic_relations.relations import GenericRelatedField

from follows.models import Follow
from lessons.models import Lesson
from activities.models import Activity
from follows.api.serializers import NestedFollowSerializer
from lessons.api.serializers import NestedLessonSerializer

class ActivitySerializer(serializers.ModelSerializer):
    content_object = GenericRelatedField({
        Lesson: NestedLessonSerializer(),
        Follow: NestedFollowSerializer()
    })

    class Meta:
        model = Activity
        fields = "__all__"
