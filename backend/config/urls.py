from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenRefreshView

from accounts.views import LoginView, MeView


urlpatterns = [
    # Django Admin
    path("admin/", admin.site.urls),

    # Authentication
    path("api/auth/login/", LoginView.as_view(), name="login"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/auth/me/", MeView.as_view(), name="me"),

    # Permissions
    path("api/functions/", include("permissions_app.urls")),

    # Users
    path("api/users/", include("accounts.urls")),

    # Employees
    path("api/employees/", include("employees.urls")),
]