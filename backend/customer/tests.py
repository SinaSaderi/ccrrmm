import unittest
from django.urls import reverse
from django.test import Client
from .models import Customer
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


def create_customer(**kwargs):
    defaults = {}
    defaults["name"] = "name"
    defaults["website"] = "website"
    defaults.update(**kwargs)
    return Customer.objects.create(**defaults)


class CustomerViewTest(unittest.TestCase):
    '''
    Tests for Customer
    '''
    def setUp(self):
        self.client = Client()

    def test_list_customer(self):
        url = reverse('customer_customer_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_create_customer(self):
        url = reverse('customer_customer_create')
        data = {
            "name": "name",
            "website": "website",
        }
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, 302)

    def test_detail_customer(self):
        customer = create_customer()
        url = reverse('customer_customer_detail', args=[customer.pk,])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_update_customer(self):
        customer = create_customer()
        data = {
            "name": "name",
            "website": "website",
        }
        url = reverse('customer_customer_update', args=[customer.pk,])
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 302)


