from django.contrib import admin
from .models import Employee, Location

# Register your models here.
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_salon', 'weekday_open', 'weekday_close', 'weekend_open', 'weekend_close')

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'primary_location', 'secondary_location', 'color', 
                    'monday_start', 'monday_end', 'tue_start', 'tue_end', 'wed_start', 'wed_end',
                    'thu_start', 'thu_end', 'fri_start', 'fri_end', 'sat_start', 'sat_end',
                    'sun_start', 'sun_end')

admin.site.register(Location, LocationAdmin)
admin.site.register(Employee, EmployeeAdmin)