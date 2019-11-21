from django.shortcuts import render
from rest_framework import viewsets
from .serializers import EmployeeSerializer, LocationSerializer, EmployeeAssignmentSerializer, RequestSerializer
from .models import Employee, Location, EmployeeAssignment, Request

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
    queryset = EmployeeAssignment.objects.filter(current=True)

class RequestView(viewsets.ModelViewSet):
    serializer_class = RequestSerializer
    queryset = Request.objects.all()
