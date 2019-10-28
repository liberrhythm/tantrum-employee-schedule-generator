from django.db import models
from django.utils import timezone
import datetime

# Create your models here.
class Location(models.Model):
    name = models.CharField(max_length=50)
    is_salon = models.BooleanField(default=True)

    def _str_(self):
        return self.name

class Employee(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    primary_location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='emp_primary_loc')
    secondary_location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='emp_secondary_loc')
    color = models.CharField(max_length=7)
    monday_start = models.TimeField(default='00:00:00')
    monday_end = models.TimeField(default='00:00:00')
    tue_start = models.TimeField(default='00:00:00')
    tue_end = models.TimeField(default='00:00:00')
    wed_start = models.TimeField(default='00:00:00')
    wed_end = models.TimeField(default='00:00:00')
    thu_start = models.TimeField(default='00:00:00')
    thu_end = models.TimeField(default='00:00:00')
    fri_start = models.TimeField(default='00:00:00')
    fri_end = models.TimeField(default='00:00:00')
    sat_start = models.TimeField(default='00:00:00')
    sat_end = models.TimeField(default='00:00:00')
    sun_start = models.TimeField(default='00:00:00')
    sun_end = models.TimeField(default='00:00:00')

    def _str_(self):
        return self.first_name + ' ' + self.last_name
