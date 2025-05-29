from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from articles.models import Page, PageFile
from articles.selectors import get_children_recursive


class PageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Page
        fields = [
            "type",
            "name",
            "content",
            "original_url",
        ]


class PageFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageFile
        fields = "__all__"


class PageBreadcrumbSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()


class PageNavigationLevel3Serializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    children = serializers.ListSerializer(child=serializers.DictField(), required=False)


class PageNavigationLevel2Serializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    children = PageNavigationLevel3Serializer(many=True)


class PageNavigationLevel1Serializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    children = PageNavigationLevel2Serializer(many=True)


class PageDetailSerializer(PageSerializer):
    files = PageFileSerializer(many=True)
    breadcrumb = serializers.SerializerMethodField()

    class Meta:
        model = Page
        fields = [
            "type",
            "name",
            "content",
            "original_url",
            "files",
            "breadcrumb",
        ]

    @extend_schema_field(PageBreadcrumbSerializer(many=True))
    def get_breadcrumb(self, instance: Page):
        parent = instance.tn_parent
        breadcrumb = [{"id": instance.id, "title": instance.name}]
        while parent is not None:
            breadcrumb.append({"id": parent.id, "title": parent.name})
            parent = parent.tn_parent
        return breadcrumb
