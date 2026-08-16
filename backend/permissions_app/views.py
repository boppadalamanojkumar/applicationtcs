from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Function
from .serializers import FunctionSerializer
from .permissions import HasFunctionPermission


class FunctionListView(APIView):

    permission_classes = [
        HasFunctionPermission
    ]

    required_function = "ASSIGN_PERMISSION"

    def get(self, request):

        functions = Function.objects.all().order_by("code")

        serializer = FunctionSerializer(
            functions,
            many=True
        )

        return Response(
            serializer.data
        )