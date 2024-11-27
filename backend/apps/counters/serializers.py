from .models import Counter
from rest_framework import serializers


class CounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Counter
        fields = [
            "id",
            "name",
            "value",
            "reset_value",
            "reset_time",
            "created_by",
            "created_at",
            "updated_at",
            "type",
        ]
