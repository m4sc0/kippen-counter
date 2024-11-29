from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import ProtectedView, RegisterView, UserView, TestView, OwnUserView
from django.urls import include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/register/", RegisterView.as_view(), name="register"),
    path("api/auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/users/", UserView.as_view(), name="users"),
    path("api/user/", OwnUserView.as_view(), name="user"),
    path("api/protected/", ProtectedView.as_view(), name="protected"),
    path("api/test/", TestView.as_view(), name="test"),
    path("api/", include("apps.counters.urls")),
]
