# app/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Employee
from .serializers import EmployeeSerializer

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def employees(request):
    if request.method == 'GET':
        infos = Employee.objects.all()
        return Response(EmployeeSerializer(infos, many=True).data)
    # POST (생성)
    serializer = EmployeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([AllowAny])
def employee(request, name):
    emp = get_object_or_404(Employee, name=name)

    if request.method == 'GET':
        return Response(EmployeeSerializer(emp).data)

    if request.method in ['PUT', 'PATCH']:
        # PUT=전체교체, PATCH=부분수정
        partial = (request.method == 'PATCH')
        serializer = EmployeeSerializer(emp, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE
    emp.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
