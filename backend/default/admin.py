from django.contrib import admin
from django import forms
from .models import Navigation

class NavigationAdminForm(forms.ModelForm):

    class Meta:
        model = Navigation
        fields = '__all__'


class NavigationAdmin(admin.ModelAdmin):
    form = NavigationAdminForm
    list_display = ['label', 'url', 'icon', 'slug']

admin.site.register(Navigation, NavigationAdmin)


