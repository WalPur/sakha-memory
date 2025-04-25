from django.db import models


class Page(models.Model):
    parent = models.ForeignKey(
        "self", models.CASCADE, related_name="children", blank=True, null=True
    )
    type = models.CharField()
    cover_img = models.ImageField(
        "Изображение раздела",
        help_text="Если его нет, то берется родительское изображение",
    )
    name = models.TextField("Название", blank=True)
    content = models.TextField("Содержимое")
