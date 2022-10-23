from django.urls import path, include
from rest_framework import routers

from . import api
from . import views

router = routers.DefaultRouter()
router.register(r'project', api.ProjectViewSet)
router.register(r'builder', api.BuilderViewSet)
router.register(r'projectimage', api.ProjectImageViewSet)


urlpatterns = (
    # urls for Django Rest Framework API
    path('api/v1/', include(router.urls)),
)

urlpatterns += (
    # urls for Project
    path('project/project/', views.ProjectListView.as_view(), name='project_project_list'),
    path('project/project/create/', views.ProjectCreateView.as_view(), name='project_project_create'),
    path('project/project/detail/<slug:slug>/', views.ProjectDetailView.as_view(), name='project_project_detail'),
    path('project/project/update/<slug:slug>/', views.ProjectUpdateView.as_view(), name='project_project_update'),
)

urlpatterns += (
    # urls for Builder
    path('project/builder/', views.BuilderListView.as_view(), name='project_builder_list'),
    path('project/builder/create/', views.BuilderCreateView.as_view(), name='project_builder_create'),
    path('project/builder/detail/<slug:slug>/', views.BuilderDetailView.as_view(), name='project_builder_detail'),
    path('project/builder/update/<slug:slug>/', views.BuilderUpdateView.as_view(), name='project_builder_update'),
)

urlpatterns += (
    # urls for ProjectImage
    path('project/projectimage/', views.ProjectImageListView.as_view(), name='project_projectimage_list'),
    path('project/projectimage/create/', views.ProjectImageCreateView.as_view(), name='project_projectimage_create'),
    path('project/projectimage/detail/<slug:slug>/', views.ProjectImageDetailView.as_view(), name='project_projectimage_detail'),
    path('project/projectimage/update/<slug:slug>/', views.ProjectImageUpdateView.as_view(), name='project_projectimage_update'),
)

