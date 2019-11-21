from django.shortcuts import render
from rest_framework import viewsets
from .serializers import EmployeeSerializer, LocationSerializer, EmployeeAssignmentSerializer
from .models import Employee, Location, EmployeeAssignment

# Create your views here.
class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

class LocationView(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()

class EmployeeAssignmentView(viewsets.ModelViewSet):
    serializer_class = EmployeeAssignmentSerializer
    queryset = EmployeeAssignment.objects.all()

class CurrentEmployeeAssignmentView(viewsets.ModelViewSet):
    serializer_class = EmployeeAssignmentSerializer
    queryset = EmployeeAssignment.objects.filter(numWeeksSince=0)

class PastEmployeeAssignmentView(viewsets.ModelViewSet):
    serializer_class = EmployeeAssignmentSerializer

    def get_queryset(self):
        week = self.request.query_params.get('numWeeksSince')
        queryset = EmployeeAssignment.objects.filter(numWeeksSince=week).order_by('start')
        return queryset