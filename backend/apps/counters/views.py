from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from .models import Counter
from .serializers import CounterSerializer
from counter.utils.responses import DetailResponse


class CounterListView(APIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = CounterSerializer

    def get(self, request):
        counters = Counter.objects.filter()
        serializer = CounterSerializer(counters, many=True)
        return DetailResponse(
            data=serializer.data,
            status=200,
            detail="Counters retrieved successfully",
        )

    def post(self, request):
        serializer = CounterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return DetailResponse(
                data=serializer.data,
                status=201,
                detail="Counter created successfully",
            )
        return DetailResponse(
            data=serializer.errors,
            status=400,
            detail="Counter could not be created",
        )


class SpecificCounter(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        counter = get_object_or_404(Counter, id=id, created_by=request.user)
        serializer = CounterSerializer(counter)
        return DetailResponse(
            data=serializer.data,
            status=200,
            detail="Counter retrieved successfully",
        )

    def put(self, request, id):
        counter = get_object_or_404(Counter, id=id, created_by=request.user)
        serializer = CounterSerializer(counter, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return DetailResponse(
                data=serializer.data,
                status=200,
                detail="Counter updated successfully",
            )
        return DetailResponse(
            data=serializer.errors,
            status=400,
            detail="Counter could not be updated",
        )

    def delete(self, request, id):
        counter = get_object_or_404(Counter, id=id, created_by=request.user)
        counter.delete()
        return DetailResponse(
            data=None,
            status=204,
            detail="Counter deleted successfully",
        )


class IncrementCounterView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        counter = get_object_or_404(Counter, id=id, created_by=request.user)
        counter.add()
        serializer = CounterSerializer(counter)
        return DetailResponse(
            data=serializer.data,
            status=200,
            detail="Counter incremented successfully",
        )


class DecrementCounterView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        counter = get_object_or_404(Counter, id=id, created_by=request.user)
        counter.subtract()
        serializer = CounterSerializer(counter)
        return DetailResponse(
            data=serializer.data,
            status=200,
            detail="Counter decremented successfully",
        )
