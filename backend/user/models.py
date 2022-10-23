from email.policy import default
from pydoc import describe
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from customer.models import Customer

class User(AbstractUser):

    mobile = models.CharField(_("mobile"), max_length=50)
    phone = models.CharField(_("phone"), max_length=50)
    addr = models.CharField(_("addr"), max_length=200, blank=True, null=True)
    avatar = models.ImageField(_("image"), blank=True, null=True)
    realestate_commision = models.IntegerField(_("reale state commission"), blank=True, null=True)
    agent_commision = models.IntegerField(_("agenct commission"), blank=True, null=True)
    budget = models.BigIntegerField(_("budget"), blank=True, null=True)
    describe = models.TextField(_("orders"), blank=True, null=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE,blank=True, null=True)
    related_users = models.ManyToManyField("self")

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        pass


class SaleManager(User):
    class Meta: 
        proxy = True
        verbose_name = _("Sale manager")
        verbose_name_plural = _("Sale Managers")

class Agent(User):
    class Meta: 
        proxy = True
        verbose_name = _("Agent")
        verbose_name_plural = _("Agents")

class Lead(User):
    class Meta: 
        proxy = True
        verbose_name = _("Lead")
        verbose_name_plural = _("Leads")

class Comment(models.Model):
    body = models.TextField()
    for_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="for_user")
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_by")
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="updated_by")
    created = models.DateTimeField(auto_now_add=True, editable=False)
    last_updated = models.DateTimeField(auto_now=True, editable=False)