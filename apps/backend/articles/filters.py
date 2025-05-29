from django.db.models import Q
from django_filters import rest_framework as filters

from articles.models import Page


class PageFilter(filters.FilterSet):
    search = filters.CharFilter(method="filter_search", label="Поиск")

    class Meta:
        model = Page
        fields = []

    def filter_search(self, queryset, name, value):
        return queryset.filter(Q(name__icontains=value) | Q(content__icontains=value))
