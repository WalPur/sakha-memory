from articles.choices import PageTypes
from ckeditor.fields import RichTextField
from django.db import models
from treenode.models import TreeNodeModel


class Page(TreeNodeModel):
    type = models.CharField(
        "Тип страницы", choices=PageTypes.choices, default=PageTypes.PAGE
    )
    cover_img = models.ImageField(
        "Изображение раздела",
        blank=True,
        null=True,
        help_text="Если его нет, то берется родительское изображение",
    )
    name = models.TextField("Название", blank=True)
    content = RichTextField("Содержимое", blank=True)
    depth = models.PositiveIntegerField(
        "Глубина страницы",
        blank=True,
        default=0,
        help_text="Необходим для построения области навигации",
    )
    original_url = models.TextField("Ссылка на оригинальную страницу", default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        depth = 0
        current = self
        while current.parent is not None:
            depth += 1
            current = current.parent
        self.depth = depth
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} | {self.type}"


class PageFile(models.Model):
    """Является содержимым для галлерей"""

    page = models.ForeignKey(Page, models.CASCADE, related_name="files")
    file = models.FileField("Файл")
