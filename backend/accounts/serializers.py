from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):

    permissions = serializers.SerializerMethodField()

    class Meta:
        model = User

        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "permissions",
        ]

    def get_permissions(self, obj):

        return list(
            obj.functions.values_list(
                "code",
                flat=True
            )
        )


class LoginSerializer(serializers.Serializer):

    email = serializers.EmailField()

    password = serializers.CharField(
        write_only=True
    )