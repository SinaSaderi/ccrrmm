from django.views.generic import DetailView, ListView, UpdateView, CreateView
from .models import Project, Builder, ProjectImage
from .forms import ProjectForm, BuilderForm, ProjectImageForm


class ProjectListView(ListView):
    model = Project


class ProjectCreateView(CreateView):
    model = Project
    form_class = ProjectForm


class ProjectDetailView(DetailView):
    model = Project


class ProjectUpdateView(UpdateView):
    model = Project
    form_class = ProjectForm


class BuilderListView(ListView):
    model = Builder


class BuilderCreateView(CreateView):
    model = Builder
    form_class = BuilderForm


class BuilderDetailView(DetailView):
    model = Builder


class BuilderUpdateView(UpdateView):
    model = Builder
    form_class = BuilderForm


class ProjectImageListView(ListView):
    model = ProjectImage


class ProjectImageCreateView(CreateView):
    model = ProjectImage
    form_class = ProjectImageForm


class ProjectImageDetailView(DetailView):
    model = ProjectImage


class ProjectImageUpdateView(UpdateView):
    model = ProjectImage
    form_class = ProjectImageForm

