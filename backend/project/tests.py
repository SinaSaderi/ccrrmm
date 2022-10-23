import unittest
from django.urls import reverse
from django.test import Client
from .models import Project, Builder, ProjectImage
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from django.contrib.contenttypes.models import ContentType


def create_django_contrib_auth_models_user(**kwargs):
    defaults = {}
    defaults["username"] = "username"
    defaults["email"] = "username@tempurl.com"
    defaults.update(**kwargs)
    return User.objects.create(**defaults)


def create_django_contrib_auth_models_group(**kwargs):
    defaults = {}
    defaults["name"] = "group"
    defaults.update(**kwargs)
    return Group.objects.create(**defaults)


def create_django_contrib_contenttypes_models_contenttype(**kwargs):
    defaults = {}
    defaults.update(**kwargs)
    return ContentType.objects.create(**defaults)


def create_project(**kwargs):
    defaults = {}
    defaults["name"] = "name"
    defaults["area"] = "area"
    defaults["bedrooms"] = "bedrooms"
    defaults["start_size"] = "start_size"
    defaults["start_price"] = "start_price"
    defaults["down_payment"] = "down_payment"
    defaults["payment_plan"] = "payment_plan"
    defaults["dld"] = "dld"
    defaults["service_charge"] = "service_charge"
    defaults["handover_date"] = "handover_date"
    defaults["description"] = "description"
    defaults["commision"] = "commision"
    defaults["contact"] = "contact"
    defaults.update(**kwargs)
    if "builder" not in defaults:
        defaults["builder"] = create_builder()
    return Project.objects.create(**defaults)


def create_builder(**kwargs):
    defaults = {}
    defaults["name"] = "name"
    defaults.update(**kwargs)
    return Builder.objects.create(**defaults)


def create_projectimage(**kwargs):
    defaults = {}
    defaults["name"] = "name"
    defaults["image"] = "image"
    defaults.update(**kwargs)
    if "project" not in defaults:
        defaults["project"] = create_project()
    return ProjectImage.objects.create(**defaults)


class ProjectViewTest(unittest.TestCase):
    '''
    Tests for Project
    '''
    def setUp(self):
        self.client = Client()

    def test_list_project(self):
        url = reverse('project_project_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_create_project(self):
        url = reverse('project_project_create')
        data = {
            "name": "name",
            "area": "area",
            "bedrooms": "bedrooms",
            "start_size": "start_size",
            "start_price": "start_price",
            "down_payment": "down_payment",
            "payment_plan": "payment_plan",
            "dld": "dld",
            "service_charge": "service_charge",
            "handover_date": "handover_date",
            "description": "description",
            "commision": "commision",
            "contact": "contact",
            "builder": create_builder().pk,
        }
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, 302)

    def test_detail_project(self):
        project = create_project()
        url = reverse('project_project_detail', args=[project.slug,])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_update_project(self):
        project = create_project()
        data = {
            "name": "name",
            "area": "area",
            "bedrooms": "bedrooms",
            "start_size": "start_size",
            "start_price": "start_price",
            "down_payment": "down_payment",
            "payment_plan": "payment_plan",
            "dld": "dld",
            "service_charge": "service_charge",
            "handover_date": "handover_date",
            "description": "description",
            "commision": "commision",
            "contact": "contact",
            "builder": create_builder().pk,
        }
        url = reverse('project_project_update', args=[project.slug,])
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 302)


class BuilderViewTest(unittest.TestCase):
    '''
    Tests for Builder
    '''
    def setUp(self):
        self.client = Client()

    def test_list_builder(self):
        url = reverse('project_builder_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_create_builder(self):
        url = reverse('project_builder_create')
        data = {
            "name": "name",
        }
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, 302)

    def test_detail_builder(self):
        builder = create_builder()
        url = reverse('project_builder_detail', args=[builder.slug,])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_update_builder(self):
        builder = create_builder()
        data = {
            "name": "name",
        }
        url = reverse('project_builder_update', args=[builder.slug,])
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 302)


class ProjectImageViewTest(unittest.TestCase):
    '''
    Tests for ProjectImage
    '''
    def setUp(self):
        self.client = Client()

    def test_list_projectimage(self):
        url = reverse('project_projectimage_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_create_projectimage(self):
        url = reverse('project_projectimage_create')
        data = {
            "name": "name",
            "image": "image",
            "project": create_project().pk,
        }
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, 302)

    def test_detail_projectimage(self):
        projectimage = create_projectimage()
        url = reverse('project_projectimage_detail', args=[projectimage.slug,])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_update_projectimage(self):
        projectimage = create_projectimage()
        data = {
            "name": "name",
            "image": "image",
            "project": create_project().pk,
        }
        url = reverse('project_projectimage_update', args=[projectimage.slug,])
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 302)


