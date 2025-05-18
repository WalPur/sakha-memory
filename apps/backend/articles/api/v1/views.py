from articles.api.v1.serializers import PageDetailSerializer, PageSerializer
from articles.models import Page
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.viewsets import GenericViewSet


class PageViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin):
    """Получение страниц разделов"""

    queryset = Page.objects.all()
    serializer_class = PageSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if self.action == "retrieve":
            return qs
        return qs.filter(tn_parent=None)

    def get_serializer_class(self):
        if self.action == "retrieve":
            return PageDetailSerializer
        return super().get_serializer_class()
