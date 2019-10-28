from rest_framework import serializers
from .models import Employee, Location

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('id', 'name', 'is_salon')

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'primary_location', 'secondary_location', 'color', 
                  'monday_start', 'monday_end', 'tue_start', 'tue_end', 'wed_start', 'wed_end',
                  'thu_start', 'thu_end', 'fri_start', 'fri_end', 'sat_start', 'sat_end',
                  'sun_start', 'sun_end')