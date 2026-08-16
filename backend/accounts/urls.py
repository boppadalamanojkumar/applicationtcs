from django.urls import path

from .views import (
    UserListView,
    AssignPermissionView,
    RemovePermissionView,
)


urlpatterns = [

    # List all users
    path(
        "",
        UserListView.as_view(),
        name="user-list"
    ),

    # Assign permission
    path(
        "<int:user_id>/permissions/",
        AssignPermissionView.as_view(),
        name="assign-permission"
    ),

    # Remove permission
    path(
        "<int:user_id>/permissions/<int:function_id>/",
        RemovePermissionView.as_view(),
        name="remove-permission"
    ),
]