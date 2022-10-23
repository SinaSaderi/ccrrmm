from . import models
from . import serializers
from rest_framework import viewsets, permissions


class NavigationViewSet(viewsets.ModelViewSet):
    """ViewSet for the Navigation class"""

    queryset = models.Navigation.objects.all()
    serializer_class = serializers.NavigationSerializer
    # permission_classes = [permissions.IsAuthenticated]


