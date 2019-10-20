from django.contrib import admin
from .models import Employee, Location

# Register your models here.
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_salon')

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'primary_location', 'secondary_location')

admin.site.register(Location, LocationAdmin)
admin.site.register(Employee, EmployeeAdmin)