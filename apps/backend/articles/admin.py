from articles.models import Page, PageFile
from ckeditor.widgets import CKEditorWidget
from django import forms
from django.contrib import admin
from treenode.admin import TreeNodeModelAdmin
from treenode.forms import TreeNodeForm


class FileInline(admin.TabularInline):
    model = PageFile
    extra = 0


class PageAdminForm(TreeNodeForm):
    content = forms.CharField(widget=CKEditorWidget())

    class Meta:
        model = Page
        fields = "__all__"


@admin.register(Page)
class PageAdmin(TreeNodeModelAdmin):
    list_display = ["name", "depth"]
    list_filter = ["type"]
    search_fields = ["name"]
    inlines = [FileInline]
    form = PageAdminForm

    treenode_display_mode = TreeNodeModelAdmin.TREENODE_DISPLAY_MODE_ACCORDION
