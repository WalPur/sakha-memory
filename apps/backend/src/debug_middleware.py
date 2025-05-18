class PrintHeadersMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print(">> Host:", request.get_host())
        print(
            ">> META:",
            {k: v for k, v in request.META.items() if k.startswith("HTTP_X")},
        )
        return self.get_response(request)
