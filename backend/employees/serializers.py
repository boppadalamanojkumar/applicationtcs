from rest_framework import serializers

from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee

        fields = [
            "id",
            "user",
            "employee_id",
            "first_name",
            "last_name",
            "email",
            "department",
            "phone",
        ]

        read_only_fields = [
            "id",
            "user",
        ]