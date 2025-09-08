from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Employee
from .serializers import EmployeeSerializer

# Create your views here.
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def employees(request):
    if request.method == 'GET':
        infos = Employee.objects.all()
        return Response(EmployeeSerializer(infos, many=True).data)

    response = request.data
    print(response)
    serializer = EmployeeSerializer(data=response)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([AllowAny])
def employee(request, name):
    emp = get_object_or_404(Employee, name=name)
    print(emp)
    emp.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
