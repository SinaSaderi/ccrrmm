from django.db import models as models
from django.urls import reverse
from django.urls import reverse

class Customer(models.Model):

    # Fields
    name = models.CharField(max_length=255)
    website = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    last_updated = models.DateTimeField(auto_now=True, editable=False)


    class Meta:
        ordering = ('-created',)

    def __str__(self) -> str:
        return self.website

    __unicode__ = __str__
