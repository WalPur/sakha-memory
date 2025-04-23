from django.db import models


class PageTypes(models.TextChoices):
    MAIN = "MAIN", "Главная страница"
    CATEGORY = "CATEGORY", "Страница раздела"
    PAGE = "PAGE", "Страница"
    GALLERY = "GALLERY", "Страница галереи"
    BOOK = "BOOK", "Страница книги"
