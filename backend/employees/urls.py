from django.urls import path

from .views import (
    EmployeeListCreateView,
    EmployeeDetailView,
    EmployeeMeView,
)


urlpatterns = [

    # Employee list + create
    path(
        "",
        EmployeeListCreateView.as_view(),
        name="employee-list-create"
    ),

    # Logged-in user's own employee profile
    path(
        "me/",
        EmployeeMeView.as_view(),
        name="employee-me"
    ),

    # Single employee
    path(
        "<int:pk>/",
        EmployeeDetailView.as_view(),
        name="employee-detail"
    ),
]