from ckeditor.widgets import CKEditorWidget
from django import forms
from django.contrib import admin

from articles.models import Page, PageFile


class FileInline(admin.TabularInline):
    model = PageFile
    extra = 0


class PageChildren(admin.TabularInline):
    model = Page
    extra = 0


class PageAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorWidget())

    class Meta:
        model = Page
        fields = "__all__"


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ["id", "content", "parent", "depth"]
    inlines = [FileInline, PageChildren]
    form = PageAdminForm
