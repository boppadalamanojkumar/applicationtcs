from django.core.management.base import BaseCommand
from permissions_app.models import Function


FUNCTIONS = [
    (
        "Create Employee",
        "CREATE_EMPLOYEE",
        "Create a new employee"
    ),
    (
        "Edit Employee",
        "EDIT_EMPLOYEE",
        "Edit an employee"
    ),
    (
        "Delete Employee",
        "DELETE_EMPLOYEE",
        "Delete an employee"
    ),
    (
        "View Employees",
        "VIEW_EMPLOYEE",
        "View employee list"
    ),
    (
        "View Self",
        "VIEW_SELF",
        "View logged-in employee profile"
    ),
    (
        "Assign Permission",
        "ASSIGN_PERMISSION",
        "Assign or revoke permissions"
    ),
]


class Command(BaseCommand):

    help = "Create required permission functions"

    def handle(self, *args, **options):

        for name, code, description in FUNCTIONS:

            Function.objects.get_or_create(
                code=code,
                defaults={
                    "name": name,
                    "description": description
                }
            )

        self.stdout.write(
            self.style.SUCCESS(
                "Permission functions seeded successfully."
            )
        )