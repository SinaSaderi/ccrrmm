from . import models

from rest_framework import serializers


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Customer
        fields = (
            'pk', 
            'name', 
            'created', 
            'last_updated', 
            'website', 
        )


