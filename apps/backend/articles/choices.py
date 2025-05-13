from django.db import models


class PageTypes(models.TextChoices):
    PAGE = "PAGE", "Страница"
    GALLERY_CATEGORY = "GALLERY_CATEGORY", "Папка галерей"
    GALLERY = "GALLERY", "Страница галереи"
    BOOK = "BOOK", "Страница книги"
