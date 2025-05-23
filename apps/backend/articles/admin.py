from articles.models import Page, PageFile
from ckeditor.widgets import CKEditorWidget
from django import forms
from django.contrib import admin
from django.shortcuts import get_object_or_404, redirect
from django.urls import path, reverse
from django.utils.html import format_html
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
    list_display = ["add_child_link", "name", "depth"]
    list_filter = ["type"]
    search_fields = ["name"]
    inlines = [FileInline]
    form = PageAdminForm

    treenode_display_mode = TreeNodeModelAdmin.TREENODE_DISPLAY_MODE_ACCORDION

    def add_child_link(self, obj):
        return format_html('<a href="{}">Добавить</a>', f"add_child/{obj.pk}/")

    add_child_link.short_description = ""

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "add_child/<int:parent_id>/",
                self.admin_site.admin_view(self.add_child_view),
                name="category_add_child",
            ),
        ]
        return custom_urls + urls

    def add_child_view(self, request, parent_id):
        parent = get_object_or_404(Page, pk=parent_id)
        url = reverse("admin:articles_page_add")
        url_with_parent = f"{url}?tn_parent={parent.pk}"
        return redirect(url_with_parent)

    def get_changeform_initial_data(self, request):
        parent_id = request.GET.get("parent")
        if parent_id:
            return {"parent": parent_id}
        return super().get_changeform_initial_data(request)
