from django.urls import path

from .views import FunctionListView


urlpatterns = [
    path(
        "",
        FunctionListView.as_view(),
        name="function-list"
    ),
]