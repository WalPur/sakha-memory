import json
import os

from bs4 import BeautifulSoup
from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand

from articles.models import Page, PageFile


class Command(BaseCommand):
    """Парсер для создания объектов базы данных"""

    file_path = ""

    def add_arguments(self, parser) -> None:
        parser.add_argument("file_path", nargs="+", type=str)

    def _get_file(self) -> list:
        """Получение данных с файла"""
        with open(self.file_path, "r", encoding="utf-8") as file:
            return json.load(file)

    def _get_parent(self, url: str, original_parent: str) -> Page | None:
        """Получение родительской страницы"""
        if original_parent is not None:
            url = original_parent
        path = url.split("/")
        while len(path) != 0:
            page = Page.objects.filter(original_url="/".join(path))
            if page.count() > 1:
                print("Родителей больше 1", url)
            if page.exists():
                return page.first()
            path.pop(-1)
        return None

    def _link_pages(self, orignal_url_dict: dict):
        pages = Page.objects.all()
        for page in pages:
            soup = BeautifulSoup(page.content)
            for anchor in soup.find_all("a"):
                if anchor.get("href") in orignal_url_dict.keys():
                    anchor["href"] = orignal_url_dict[anchor.href]
            page.content = str(soup)
            page.save()

    def handle(self, *args, **options):
        Page.objects.all().delete()
        self.file_path = options["file_path"][0]
        data = self._get_file()
        original_url_parse = {}
        for item in data:
            page = Page.objects.create(
                tn_parent=self._get_parent(
                    item.get("url"), item.get("original_parent")
                ),
                name=item.get("name"),
                content=item.get("content_html", ""),
                original_url=item.get("url"),
                type=item.get("type"),
            )
            original_url_parse[item.get("url")] = page.id
            for file_data in item["files"]:
                file_path = file_data.get("path")
                if file_path and os.path.exists(file_path):
                    with open(file_path, "rb") as f:
                        file_name = os.path.basename(file_path)
                        django_file = File(f, name=file_name)
                        PageFile.objects.create(page=page, file=django_file)
                else:
                    print(f"Файл не найден: {file_path}")
        self._link_pages(original_url_parse)
