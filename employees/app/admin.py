from django.contrib import admin

from app.models import Employee


# Register your models here.

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "age", "job", "language", "pay")
    ordering = ("-id",)
    # "-id"는 최신 등록이 가장 상위로 가게 만듦 (날짜 내림차순)