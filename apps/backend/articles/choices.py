from django.db import models


class PageTypes(models.TextChoices):
    PAGE = "PAGE", "Страница"
    GALLERY = "GALLERY", "Страница галереи"
    BOOK = "BOOK", "Страница книги"
