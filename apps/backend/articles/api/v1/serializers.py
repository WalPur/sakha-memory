from rest_framework import serializers

from articles.models import Page, PageFile


class PageSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    cover_img = serializers.SerializerMethodField()

    class Meta:
        model = Page
        fields = "__all__"

    def get_children(self, instance: Page):
        return PageSerializer(
            instance.children.all(),
            many=True,
            context=self.context,
        ).data

    def get_cover_img(self, instance: Page):
        request = self.context.get("request")
        current_instance = instance

        while current_instance is not None:
            if current_instance.cover_img:
                return request.build_absolute_uri(current_instance.cover_img.url)
            current_instance = current_instance.parent

        return None


class PageFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageFile
        fields = "__all__"


class PageDetailSerializer(PageSerializer):
    files = PageFileSerializer(many=True)
