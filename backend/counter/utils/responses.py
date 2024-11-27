from rest_framework.response import Response


class DetailResponse(Response):
    def __init__(self, status, detail, data, created_by=None, *args, **kwargs):
        response_data = {
            "status": status,
            "detail": detail,
            "data": data,
        }
        super().__init__(response_data, status=status, *args, **kwargs)
