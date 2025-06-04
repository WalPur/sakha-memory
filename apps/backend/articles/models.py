import os
from datetime import datetime

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


def custom_upload_to(instance, filename):
    ext = filename.split(".")[-1]
    new_filename = f"{instance.pk}_{datetime.now().strftime('%Y%m%d%H%M%S')}.{ext}"
    return os.path.join(instance.page.name, new_filename)


class PageFile(models.Model):
    """Является содержимым для галлерей"""

    page = models.ForeignKey(Page, models.CASCADE, related_name="files")
    file = models.FileField("Файл", upload_to=custom_upload_to, max_length=1024)
