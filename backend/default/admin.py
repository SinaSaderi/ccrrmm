from django.contrib import admin
from django import forms
from .models import Navigation
from django.contrib.admin import widgets
class NavigationAdminForm(forms.ModelForm):

    class Meta:
        model = Navigation
        fields = '__all__'


class NavigationAdmin(admin.ModelAdmin):
    form = NavigationAdminForm
    list_display = ['name', 'key', 'type', 'route', 'parent', 'order', 'no_collapse']
    list_filter = ("is_active", "groups", "parent")
    ordering = ["order"]

    fieldsets = (
        (None, {'fields': ['parent', 'type', 'name', 'key', 'route', 'icon', 'component', 'no_collapse', 'order', 'is_active']}),
        ('permission', {'fields': ('groups',)})
    )

    def formfield_for_manytomany(self, db_field, request=None, **kwargs):
        kwargs['widget']= widgets.FilteredSelectMultiple(
            db_field.verbose_name,
            db_field.name in self.filter_vertical
        )

        return super(admin.ModelAdmin, self).formfield_for_manytomany(
            db_field, request=request, **kwargs)

admin.site.register(Navigation, NavigationAdmin)


