from django.contrib import admin
from .models import User

# for formatting of the Users table in the Admin Dashboard
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "first_name", "last_name", "email")

# register the User model to the admin dashboard
admin.site.register(User, UserAdmin)