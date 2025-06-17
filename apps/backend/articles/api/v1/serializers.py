from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from articles.models import Page, PageFile


class PageSerializer(serializers.ModelSerializer):
    has_inside_file = serializers.SerializerMethodField()
    type_label = serializers.SerializerMethodField()
    elements_count = serializers.SerializerMethodField()

    class Meta:
        model = Page
        fields = [
            "id",
            "type",
            "type_label",
            "name",
            "has_inside_file",
            "content",
            "original_url",
            "elements_count",
        ]

    def get_elements_count(self, obj):
        if obj.type in ["BOOK", "AUDIO", "GALLERY", "VIDEO"]:
            return obj.files.count()
        return obj.get_children_count()

    def get_type_label(self, obj):
        return obj.get_type_display()

    def get_has_inside_file(self, obj):
        if obj.type in ["BOOK", "AUDIO", "GALLERY", "VIDEO"] and obj.files.count() > 0:
            return True
        return False


class PageFileSerializer(serializers.ModelSerializer):
    file = serializers.SerializerMethodField()

    class Meta:
        model = PageFile
        fields = "__all__"

    def get_file(self, obj):
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url


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


class PageDetailSerializer(serializers.ModelSerializer):
    files = PageFileSerializer(many=True)
    breadcrumb = serializers.SerializerMethodField()
    children = serializers.SerializerMethodField()

    class Meta:
        model = Page
        fields = [
            "id",
            "type",
            "name",
            "content",
            "original_url",
            "files",
            "breadcrumb",
            "children",
        ]

    @extend_schema_field(PageBreadcrumbSerializer(many=True))
    def get_breadcrumb(self, instance: Page):
        parent = instance.tn_parent
        breadcrumb = [{"id": instance.id, "title": instance.name}]
        while parent is not None:
            breadcrumb.append({"id": parent.id, "title": parent.name})
            parent = parent.tn_parent
        return breadcrumb

    @extend_schema_field(PageSerializer(many=True))
    def get_children(self, instance: Page):
        children = instance.get_children()
        return PageSerializer(children, many=True).data
