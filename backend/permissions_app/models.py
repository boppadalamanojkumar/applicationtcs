from django.db import models


class Function(models.Model):

    name = models.CharField(
        max_length=100
    )

    code = models.CharField(
        max_length=100,
        unique=True
    )

    description = models.TextField(
        blank=True
    )


    def save(self, *args, **kwargs):

        self.code = self.code.upper()

        super().save(*args, **kwargs)


    def __str__(self):

        return self.code