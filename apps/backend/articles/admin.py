from django.contrib import admin

from articles.models import Page


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ["content"]
