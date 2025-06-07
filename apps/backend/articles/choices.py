from django.db import models


class PageTypes(models.TextChoices):
    PAGE = "PAGE", "Страница"
    SECTION = "SECTION", "Раздел"
    CATEGORY = "CATEGORY", "Категория"
    AUDIO_CATEGORY = "AUDIO_CATEGORY", "Папка аудиоматериалов"
    AUDIO = "AUDIO", "Аудиоматериал"
    GALLERY_CATEGORY = "GALLERY_CATEGORY", "Папка галерей"
    GALLERY = "GALLERY", "Страница галереи"
    VIDEO_CATEGORY = "VIDEO_CATEGORY", "Папка видеоматериалов"
    VIDEO = "VIDEO", "Страница видеоматериала"
    BOOK_CATEGORY = "BOOK_CATEGORY", "Папка книг"
    BOOK = "BOOK", "Страница книги"
