from django.urls import path
from . import views

urlpatterns = [
    path('emp/', views.employees, name='employees'),
    path('emp/<str:name>', views.employee, name='employee_delete'),
]