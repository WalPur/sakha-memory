from django.db import models


class PageTypes(models.TextChoices):
    PAGE = "PAGE", "Страница"
    CATEGORY = "CATEGORY", "Категория"
    GALLERY_CATEGORY = "GALLERY_CATEGORY", "Папка галерей"
    GALLERY = "GALLERY", "Страница галереи"
    VIDEO_CATEGORY = "VIDEO_CATEGORY", "Папка видеоматериалов"
    VIDEO = "VIDEO", "Страница видеоматериала"
    BOOK_CATEGORY = "BOOK_CATEGORY", "Папка книг"
    BOOK = "BOOK", "Страница книги"
