from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import Employee
from .serializers import EmployeeSerializer

from .permissions import (
    CanCreateEmployee,
    CanEditEmployee,
    CanDeleteEmployee,
    CanViewEmployee,
    CanViewSelf,
)


class EmployeePagination(PageNumberPagination):

    page_size = 10

    page_size_query_param = "page_size"

    max_page_size = 50


class EmployeeListCreateView(
    generics.ListCreateAPIView
):

    queryset = Employee.objects.all().order_by("id")

    serializer_class = EmployeeSerializer

    pagination_class = EmployeePagination


    def get_permissions(self):

        if self.request.method == "GET":

            return [
                CanViewEmployee()
            ]

        return [
            CanCreateEmployee()
        ]


    def perform_create(self, serializer):

        serializer.save(
            user=self.request.user
        )


class EmployeeDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Employee.objects.all()

    serializer_class = EmployeeSerializer


    def get_permissions(self):

        if self.request.method in [
            "PUT",
            "PATCH"
        ]:

            return [
                CanEditEmployee()
            ]

        if self.request.method == "DELETE":

            return [
                CanDeleteEmployee()
            ]

        return [
            CanViewEmployee()
        ]


class EmployeeMeView(
    generics.RetrieveAPIView
):

    serializer_class = EmployeeSerializer

    permission_classes = [
        CanViewSelf
    ]


    def get_object(self):

        return Employee.objects.get(
            user=self.request.user
        )


    def get(self, request, *args, **kwargs):

        try:

            return super().get(
                request,
                *args,
                **kwargs
            )

        except Employee.DoesNotExist:

            return Response(
                {
                    "detail": "Employee profile not found."
                },
                status=404
            )
        