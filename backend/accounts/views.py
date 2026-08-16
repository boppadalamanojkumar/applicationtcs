from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import LoginSerializer, UserSerializer

from permissions_app.models import Function
from permissions_app.permissions import HasFunctionPermission


class LoginView(APIView):

    permission_classes = [
        AllowAny
    ]

    def post(self, request):

        serializer = LoginSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        user = authenticate(
            request,
            email=email,
            password=password
        )

        if user is None:

            return Response(
                {
                    "detail": "Invalid email or password."
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": UserSerializer(user).data
            }
        )


class MeView(APIView):

    def get(self, request):

        return Response(
            UserSerializer(
                request.user
            ).data
        )


class UserListView(APIView):

    permission_classes = [
        HasFunctionPermission
    ]

    required_function = "ASSIGN_PERMISSION"

    def get(self, request):

        users = User.objects.prefetch_related(
            "functions"
        ).all()

        serializer = UserSerializer(
            users,
            many=True
        )

        return Response(
            serializer.data
        )


class AssignPermissionView(APIView):

    permission_classes = [
        HasFunctionPermission
    ]

    required_function = "ASSIGN_PERMISSION"

    def post(self, request, user_id):

        try:

            user = User.objects.get(
                id=user_id
            )

            function = Function.objects.get(
                id=request.data.get("function_id")
            )

        except User.DoesNotExist:

            return Response(
                {
                    "detail": "User not found."
                },
                status=404
            )

        except Function.DoesNotExist:

            return Response(
                {
                    "detail": "Function not found."
                },
                status=404
            )

        user.functions.add(
            function
        )

        return Response(
            UserSerializer(user).data
        )


class RemovePermissionView(APIView):

    permission_classes = [
        HasFunctionPermission
    ]

    required_function = "ASSIGN_PERMISSION"

    def delete(
        self,
        request,
        user_id,
        function_id
    ):

        try:

            user = User.objects.get(
                id=user_id
            )

            function = Function.objects.get(
                id=function_id
            )

        except User.DoesNotExist:

            return Response(
                {
                    "detail": "User not found."
                },
                status=404
            )

        except Function.DoesNotExist:

            return Response(
                {
                    "detail": "Function not found."
                },
                status=404
            )

        user.functions.remove(
            function
        )

        return Response(
            UserSerializer(user).data
        )