from django.db import models
from django.utils.timezone import now

# Create your models here.
class Location(models.Model):
    name = models.CharField(max_length=50)
    is_salon = models.BooleanField(default=True)
    monday_open = models.TimeField(default='08:00:00')
    monday_close = models.TimeField(default='08:00:00')
    tue_open = models.TimeField(default='08:00:00')
    tue_close = models.TimeField(default='08:00:00')
    wed_open = models.TimeField(default='08:00:00')
    wed_close = models.TimeField(default='08:00:00')
    thu_open = models.TimeField(default='08:00:00')
    thu_close = models.TimeField(default='08:00:00')
    fri_open = models.TimeField(default='08:00:00')
    fri_close = models.TimeField(default='08:00:00')
    sat_open = models.TimeField(default='08:00:00')
    sat_close = models.TimeField(default='08:00:00')
    sun_open = models.TimeField(default='08:00:00')
    sun_close = models.TimeField(default='08:00:00')

    def _str_(self):
        return self.name

class Employee(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    primary_location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='emp_primary_loc')
    secondary_location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='emp_secondary_loc')
    email = models.CharField(max_length=30, default='joe@gmail.com')
    password = models.CharField(max_length=30, default='password')
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


class EmployeeAssignment(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='empassign_emp')
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='empassign_loc')
    start = models.DateTimeField(default=now, blank=True)
    numWeeksSince = models.IntegerField(default=0)

class Request(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='emp')
    leave_date = models.DateTimeField(default=now, blank=True)
    return_date = models.DateTimeField(default=now, blank=True)
    status = models.CharField(max_length=20)
