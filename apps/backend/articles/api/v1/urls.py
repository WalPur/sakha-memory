from django.urls import include, path
from rest_framework.routers import DefaultRouter

from articles.api.v1.views import PageViewSet

router = DefaultRouter()
router.register("", PageViewSet)


urlpatterns = [path("", include(router.urls))]
