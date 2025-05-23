import urllib

from articles.api.v1.serializers import PageDetailSerializer, PageSerializer
from articles.models import Page
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.response import Response
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

    def get_object(self):
        lookup_value = self.kwargs.get(self.lookup_field, None)
        lookup_value = urllib.parse.unquote(lookup_value)  # декодируем URL

        obj = Page.objects.filter(original_url=lookup_value)
        if obj.count() == 0:
            obj = get_object_or_404(Page, pk=lookup_value)
        else:
            obj = obj.first()
        self.check_object_permissions(self.request, obj)
        return obj

    lookup_field = "lookup_value"
