from bs4 import BeautifulSoup

from articles.models import Page


def link_pages(orignal_url_dict: dict):
    pages = Page.objects.all()
    for page in pages:
        soup = BeautifulSoup(page.content)
        for anchor in soup.find_all("a"):
            if anchor.get("href") in orignal_url_dict.keys():
                anchor.href = orignal_url_dict[anchor.href]
