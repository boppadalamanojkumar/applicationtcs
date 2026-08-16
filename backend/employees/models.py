from django.db import models

from accounts.models import User


class Employee(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="employee_profile"
    )

    employee_id = models.CharField(
        max_length=50,
        unique=True
    )

    first_name = models.CharField(
        max_length=100
    )

    last_name = models.CharField(
        max_length=100
    )

    email = models.EmailField()

    department = models.CharField(
        max_length=100
    )

    phone = models.CharField(
        max_length=30,
        blank=True
    )


    def __str__(self):

        return (
            f"{self.employee_id} - "
            f"{self.first_name} "
            f"{self.last_name}"
        )