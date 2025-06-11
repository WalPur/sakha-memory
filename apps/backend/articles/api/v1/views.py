from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from articles.api.v1.serializers import (
    PageDetailSerializer,
    PageNavigationLevel1Serializer,
    PageSerializer,
)
from articles.filters import PageFilter
from articles.models import Page
from articles.selectors import get_children_recursive


class PageViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin):
    """Получение страниц разделов"""

    queryset = Page.objects.all()
    serializer_class = PageSerializer
    filterset_class = PageFilter

    def get_serializer_class(self):
        if self.action == "retrieve":
            return PageDetailSerializer
        return super().get_serializer_class()

    @action(["GET"], False, serializer_class=PageNavigationLevel1Serializer)
    def navigation(self, request):
        categories = Page.objects.filter(type="SECTION")
        navigation = []
        for category in categories:
            category_data = {
                "id": category.id,
                "name": category.name,
                "children": get_children_recursive(category, depth=1),
            }
            navigation.append(category_data)
        return Response(navigation)
