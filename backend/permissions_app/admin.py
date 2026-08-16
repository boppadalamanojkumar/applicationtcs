from django.contrib import admin
from .models import Function


@admin.register(Function)
class FunctionAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "code",
        "description",
    )

    search_fields = (
        "name",
        "code",
    )