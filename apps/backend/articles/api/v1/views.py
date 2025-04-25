from rest_framework.mixins import ListModelMixin
from rest_framework.viewsets import GenericViewSet

from articles.api.v1.serializers import PageSerializer
from articles.models import Page


class PageViewSet(GenericViewSet, ListModelMixin):
    """Получение страниц разделов"""

    queryset = Page.objects.filter(parent=None)
    serializer_class = PageSerializer
