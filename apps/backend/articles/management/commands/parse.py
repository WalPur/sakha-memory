import json
import os

from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand, CommandError

from articles.models import Page, PageFile


def save_file_to_media(original_path, page):
    # Получаем имя файла
    file_name = os.path.basename(original_path)

    # Путь внутри MEDIA_ROOT, например: media/uploads/filename.pdf
    relative_path = os.path.join("uploads", file_name)
    full_destination_path = os.path.join(settings.MEDIA_ROOT, relative_path)

    # Убеждаемся, что папка существует
    os.makedirs(os.path.dirname(full_destination_path), exist_ok=True)

    # Копируем файл вручную в MEDIA_ROOT
    with open(original_path, "rb") as source_file:
        with open(full_destination_path, "wb") as dest_file:
            dest_file.write(source_file.read())

    # Теперь открываем его как Django File и сохраняем
    with open(full_destination_path, "rb") as f:
        django_file = File(f)
        PageFile.objects.create(page=page, file=django_file)


class Command(BaseCommand):
    """Парсер для создания объектов базы данных"""

    file_path = ""

    def add_arguments(self, parser):
        parser.add_argument("file_path", nargs="+", type=str)

    def _get_file(self) -> list:
        """Получение данных с файла"""
        with open(self.file_path, "r", encoding="utf-8") as file:
            return json.load(file)

    def handle(self, *args, **options):
        Page.objects.all().delete()
        self.file_path = options["file_path"][0]
        data = self._get_file()
        for item in data:
            page = Page.objects.create(
                name=item.get("name"),
                content=item.get("content_html", ""),
                original_url=item.get("url"),
            )
            for file_data in item["files"]:
                file_path = file_data.get("path")
                if file_path and os.path.exists(file_path):
                    with open(file_path, "rb") as f:
                        file_name = os.path.basename(file_path)
                        django_file = File(f, name=file_name)
                        PageFile.objects.create(page=page, file=django_file)
                else:
                    print(f"Файл не найден: {file_path}")
