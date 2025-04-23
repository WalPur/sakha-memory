from django.db import models


class Page(models.Model):
    parent = models.ForeignKey("self", models.CASCADE)
    type = models.CharField()
    cover_img = models.ImageField(
        "Изображение раздела",
        help_text="Если его нет, то берется родительское изображение",
    )
    content = models.TextField("Содержимое")
