from dataclasses import fields
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.admin import widgets
from .forms import UserAdminForm, ManagerAdminForm, AgentAdminForm, LeadAdminForm
from django.utils.translation import gettext_lazy as _
from customer.models import Customer

# Register your models here.
from user.models import User, SaleManager, Agent, Lead, Comment

class MyUserAdmin(UserAdmin):
    model = User
    list_display = ['id', 'username', 'customer']

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "email")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
        (_("Customer"), {"fields": ("customer",)}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "password1", "password2"),
            },
        ),
    )

admin.site.register(User, MyUserAdmin)


@admin.register(SaleManager)
class SaleManagerAdmin(admin.ModelAdmin):
    form = ManagerAdminForm
    list_display = ('id', 'first_name', 'last_name', 'username', 'email', 'customer')
    fieldsets = (
        (None, {'fields': ('customer', 'username', 'email')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('contact', {'fields': ('mobile','addr', 'avatar')}),
        ('leads', {'fields': ('related_users',)})
    )
    # ordering = ['-created_at']
    search_fields = ['first_name', 'last_name', 'username', 'email']

    def get_queryset(self, request):
        qs = super(SaleManagerAdmin, self).get_queryset(request)
        return qs.filter(groups__name='manager')

    def formfield_for_manytomany(self, db_field, request=None, **kwargs):
        kwargs['widget']= widgets.FilteredSelectMultiple(
            db_field.verbose_name,
            db_field.name in self.filter_vertical
        )

        return super(admin.ModelAdmin, self).formfield_for_manytomany(
            db_field, request=request, **kwargs)

@admin.register(Agent)
class AgentAdmin(admin.ModelAdmin):
    form = AgentAdminForm
    list_display = ('id', 'first_name', 'last_name', 'username', 'email', 'customer')
    fieldsets = (
        (None, {'fields': ('customer', 'username', 'email')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('contact', {'fields': ('mobile','addr', 'avatar')}),
        ('commision', {'fields': ('realestate_commision','agent_commision')}),
        ('leads', {'fields': ('related_users',)})
    )
    search_fields = ['first_name', 'last_name', 'username', 'email']

    def get_queryset(self, request):
        qs = super(AgentAdmin, self).get_queryset(request)
        return qs.filter(groups__name='agent')

    def formfield_for_manytomany(self, db_field, request=None, **kwargs):
        kwargs['widget']= widgets.FilteredSelectMultiple(
            db_field.verbose_name,
            db_field.name in self.filter_vertical
        )

        return super(admin.ModelAdmin, self).formfield_for_manytomany(
            db_field, request=request, **kwargs)

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'username', 'email', 'customer')
    fieldsets = (
        (None, {'fields': ('customer', 'username', 'email')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('contact', {'fields': ('mobile','addr', 'avatar')}),
        ('detail', {'fields': ('budget','describe')}),
    )
    # ordering = ['-created_at']
    search_fields = ['first_name', 'last_name', 'username', 'email']

    def get_queryset(self, request):
        qs = super(LeadAdmin, self).get_queryset(request)
        return qs.filter(groups__name='lead')

@admin.register(Comment)
class Comment(admin.ModelAdmin):
    list_display = ("id", "body", "for_user")