from . import models

from rest_framework import serializers


class NavigationSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Navigation
        fields = (
            'slug', 
            'label', 
            'url', 
            'icon', 
            'component',
        )


