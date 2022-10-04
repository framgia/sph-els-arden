from django.contrib import admin
from .models import Activity

class ActivityAdmin(admin.ModelAdmin):
    list_display = ("id", 'activity_date')

admin.site.register(Activity, ActivityAdmin)
