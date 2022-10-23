from . import models
from . import serializers
from rest_framework import viewsets, permissions


class ProjectViewSet(viewsets.ModelViewSet):
    """ViewSet for the Project class"""

    queryset = models.Project.objects.all()
    serializer_class = serializers.ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]


class BuilderViewSet(viewsets.ModelViewSet):
    """ViewSet for the Builder class"""

    queryset = models.Builder.objects.all()
    serializer_class = serializers.BuilderSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProjectImageViewSet(viewsets.ModelViewSet):
    """ViewSet for the ProjectImage class"""

    queryset = models.ProjectImage.objects.all()
    serializer_class = serializers.ProjectImageSerializer
    permission_classes = [permissions.IsAuthenticated]


