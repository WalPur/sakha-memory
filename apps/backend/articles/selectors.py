from articles.models import Page


def get_children_recursive(instance: Page, depth: int = 0):
    if depth > 2:
        return []

    children = []
    for child in instance.get_children_queryset():
        child_data = {
            "id": child.id,
            "name": child.name,
            "children": get_children_recursive(child, depth + 1),
        }
        children.append(child_data)
    return children
