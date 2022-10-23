import unittest
from django.urls import reverse
from django.test import Client
from .models import Navigation
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


def create_navigation(**kwargs):
    defaults = {}
    defaults["label"] = "label"
    defaults["url"] = "url"
    defaults["icon"] = "icon"
    defaults["slug"] = "slug"
    defaults.update(**kwargs)
    if "parent" not in defaults:
        defaults["parent"] = create_"self"()
    return Navigation.objects.create(**defaults)


class NavigationViewTest(unittest.TestCase):
    '''
    Tests for Navigation
    '''
    def setUp(self):
        self.client = Client()

    def test_list_navigation(self):
        url = reverse('default_navigation_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_create_navigation(self):
        url = reverse('default_navigation_create')
        data = {
            "label": "label",
            "url": "url",
            "icon": "icon",
            "slug": "slug",
            "parent": create_"self"().pk,
        }
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, 302)

    def test_detail_navigation(self):
        navigation = create_navigation()
        url = reverse('default_navigation_detail', args=[navigation.slug,])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_update_navigation(self):
        navigation = create_navigation()
        data = {
            "label": "label",
            "url": "url",
            "icon": "icon",
            "slug": "slug",
            "parent": create_"self"().pk,
        }
        url = reverse('default_navigation_update', args=[navigation.slug,])
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 302)


