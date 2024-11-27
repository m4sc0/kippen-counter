from django.contrib.auth.models import User
from django.db import models
from django.utils.timezone import now


class Counter(models.Model):
    TYPE_CHOICES = (
        (0, "normal"),
        (1, "hourly"),
        (2, "daily"),
        (3, "weekly"),
        (4, "monthly"),
        (5, "yearly"),
    )

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=128)
    value = models.IntegerField(default=0)  # Total accumulated value
    reset_value = models.IntegerField(default=0)  # Value within the current period
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    type = models.IntegerField(
        choices=TYPE_CHOICES, default=0
    )  # 0 = normal, 1 = hourly, 2 = daily
    reset_time = models.TimeField(null=True, blank=True)  # Time when reset occurs

    def __str__(self):
        return f"{self.name}: {self.value} (reset_value: {self.reset_value})"

    def reset_if_needed(self):
        """
        Check if the reset time has passed and update `value` with `reset_value`.
        """
        current_time = now()

        if self.type == 0:  # Normal counter, no reset
            return

        if self.type == 1:  # Hourly reset
            if (current_time - self.updated_at).seconds >= 3600:
                self._perform_reset()

        elif self.type == 2:  # Daily reset
            if current_time.date() > self.updated_at.date():
                self._perform_reset()

        elif self.type == 3:  # Weekly reset
            if (
                current_time.isocalendar()[1] > self.updated_at.isocalendar()[1]
                or current_time.year > self.updated_at.year
            ):
                self._perform_reset()

        elif self.type == 4:  # Monthly reset
            if (
                current_time.year > self.updated_at.year
                or current_time.month > self.updated_at.month
            ):
                self._perform_reset()

        elif self.type == 5:  # Yearly reset
            if current_time.year > self.updated_at.year:
                self._perform_reset()

    def _perform_reset(self):
        """
        Add `reset_value` to `value`, reset `reset_value`, and update the timestamp.
        """
        self.value += self.reset_value
        self.reset_value = 0
        self.updated_at = now()
        self.save()

    def add(self):
        """
        Add to the counter, updating `reset_value` or `value` based on type.
        """
        self.reset_if_needed()
        if self.type != 0:  # Not normal
            self.reset_value += 1
        else:
            self.value += 1
        self.save()

    def subtract(self):
        """
        Subtract from the counter, updating `reset_value` or `value` based on type.
        """
        self.reset_if_needed()
        if self.type != 0:  # Not normal
            self.reset_value -= 1
        else:
            self.value -= 1
        self.save()
