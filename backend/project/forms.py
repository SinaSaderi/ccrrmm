from django import forms
from .models import Project, Builder, ProjectImage


class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ['name', 'area', 'bedrooms', 'start_size', 'start_price', 'down_payment', 'payment_plan', 'dld', 'service_charge', 'handover_date', 'description', 'commision', 'contact', 'builder']


class BuilderForm(forms.ModelForm):
    class Meta:
        model = Builder
        fields = ['name']


class ProjectImageForm(forms.ModelForm):
    class Meta:
        model = ProjectImage
        fields = ['name', 'image', 'project']


