from rest_framework import serializers

from articles.models import Page


class PageSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Page
        fields = "__all__"

    def get_children(self, instance: Page):
        return PageSerializer(instance.children.all(), many=True).data
