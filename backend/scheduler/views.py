from django.shortcuts import render
from rest_framework import viewsets
from .serializers import EmployeeSerializer, LocationSerializer
from .models import Employee, Location

# Create your views here.
class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

class LocationView(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()
