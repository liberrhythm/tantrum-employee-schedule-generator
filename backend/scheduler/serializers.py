from rest_framework import serializers
from .models import Employee, Location, EmployeeAssignment, Request, Event
import logging
logger = logging.getLogger()


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    ploc = serializers.SerializerMethodField()
    sloc = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = '__all__'

    def get_ploc(self, obj):
        return LocationSerializer(obj.primary_location).data

    def get_sloc(self, obj):
        return LocationSerializer(obj.secondary_location).data

class EmployeeAssignmentSerializer(serializers.ModelSerializer):
    emp = serializers.SerializerMethodField()
    loc = serializers.SerializerMethodField()

    class Meta:
        model = EmployeeAssignment
        fields = '__all__'

    def get_emp(self, obj):
        return EmployeeSerializer(obj.employee).data

    def get_loc(self, obj):
        return LocationSerializer(obj.location).data  

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'      

class RequestSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    emp = serializers.SerializerMethodField()

    class Meta:
        model = Request
        fields = '__all__'

    def get_emp(self, obj):
        return EmployeeSerializer(obj.employee).data 
