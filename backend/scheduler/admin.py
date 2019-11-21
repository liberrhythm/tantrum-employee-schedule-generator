from django.contrib import admin
from .models import Employee, Location, EmployeeAssignment, Event

# Register your models here.
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_salon')

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'primary_location', 'secondary_location', 'color')

class EmployeeAssignmentAdmin(admin.ModelAdmin):
    list_display = ('employee', 'location', 'start')

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'event_start', 'event_end')

admin.site.register(Location, LocationAdmin)
admin.site.register(Employee, EmployeeAdmin)
admin.site.register(EmployeeAssignment, EmployeeAssignmentAdmin)
admin.site.register(Event, EventAdmin)