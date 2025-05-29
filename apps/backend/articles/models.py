from ckeditor.fields import RichTextField
from django.db import models
from treenode.models import TreeNodeModel

from articles.choices import PageTypes


class Page(TreeNodeModel):
    type = models.CharField(
        "Тип страницы", choices=PageTypes.choices, default=PageTypes.PAGE
    )
    name = models.TextField("Название", blank=True)
    content = RichTextField("Содержимое", blank=True)
    original_url = models.TextField("Ссылка на оригинальную страницу", default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} | {self.type}"


class PageFile(models.Model):
    """Является содержимым для галлерей"""

    page = models.ForeignKey(Page, models.CASCADE, related_name="files")
    file = models.FileField("Файл")
