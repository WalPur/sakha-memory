from articles.api.v1.views import PageViewSet
from django.urls import include, path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("", PageViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("<str:lookup_value>/", PageViewSet.as_view({"get": "retrieve"})),
]
