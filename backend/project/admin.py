from django.contrib import admin
from django import forms
from .models import Project, Builder, ProjectImage

class ProjectAdminForm(forms.ModelForm):

    class Meta:
        model = Project
        fields = '__all__'


class ProjectAdmin(admin.ModelAdmin):
    form = ProjectAdminForm
    list_display = ['name', 'slug',]

admin.site.register(Project, ProjectAdmin)


class BuilderAdminForm(forms.ModelForm):

    class Meta:
        model = Builder
        fields = '__all__'


class BuilderAdmin(admin.ModelAdmin):
    form = BuilderAdminForm
    list_display = ['name', 'slug', 'created', 'last_updated']

admin.site.register(Builder, BuilderAdmin)


class ProjectImageAdminForm(forms.ModelForm):

    class Meta:
        model = ProjectImage
        fields = '__all__'


class ProjectImageAdmin(admin.ModelAdmin):
    form = ProjectImageAdminForm
    list_display = ['name', 'slug', 'created', 'last_updated', 'image']

admin.site.register(ProjectImage, ProjectImageAdmin)


