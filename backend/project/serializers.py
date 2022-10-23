from . import models

from rest_framework import serializers


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Project
        fields = (
            'slug', 
            'name', 
            'created', 
            'last_updated', 
            'area', 
            'bedrooms', 
            'start_size', 
            'start_price', 
            'down_payment', 
            'payment_plan', 
            'dld', 
            'service_charge', 
            'handover_date', 
            'description', 
            'commision', 
            'contact', 
        )


class BuilderSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Builder
        fields = (
            'slug', 
            'name', 
            'created', 
            'last_updated', 
        )


class ProjectImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.ProjectImage
        fields = (
            'slug', 
            'name', 
            'created', 
            'last_updated', 
            'image', 
        )


