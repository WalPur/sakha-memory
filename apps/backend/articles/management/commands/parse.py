import json

from django.core.files import File
from django.core.management.base import BaseCommand, CommandError

from articles.models import Page, PageFile


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
                orignal_url=item.get("url"),
            )
            for file_path in item.get("files"):
                try:
                    with open(file_path, "rb") as f:
                        django_file = File(f)
                        PageFile.objects.create(page=page, file=django_file)
                except FileNotFoundError:
                    self.stderr.write(f"Файл не найден: {file_path}")
                except Exception as e:
                    self.stderr.write(f"Ошибка при обработке файла {file_path}: {e}")
