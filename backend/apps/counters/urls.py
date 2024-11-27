from django.urls import path
from .views import *

urlpatterns = [
    path("counters/", CounterListView.as_view(), name="counter-list"),
    path("counters/<int:id>/", SpecificCounter.as_view(), name="specific-counter"),
    path(
        "counters/<int:id>/increment/",
        IncrementCounterView.as_view(),
        name="add-to-counter",
    ),
    path(
        "counters/<int:id>/decrement/",
        DecrementCounterView.as_view(),
        name="subtract-from-counter",
    ),
]
