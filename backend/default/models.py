from django.db import models as models
from django.contrib.auth.models import Group

class Navigation(models.Model):

    # Fields
    type = models.CharField(max_length=200, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    key = models.CharField(max_length=200, null=True, blank=True)
    route = models.CharField(max_length=200, null=True, blank=True)
    icon = models.CharField(max_length=200, null=True, blank=True)
    component = models.CharField(max_length=200, null=True, blank=True)
    no_collapse = models.BooleanField(default=0)
    order = models.FloatField(default=0.0)
    is_active = models.BooleanField(default=1)
    groups = models.ManyToManyField(
        Group,
        verbose_name=("groups"),
        blank=True,
        help_text=(
            "The groups this user belongs to. A user will get all permissions "
            "granted to each of their groups."
        ),
        related_name="navgation_set",
        related_query_name="navigation",
    )

    # Relationship Fields
    parent = models.ForeignKey("self", blank=True, null=True, on_delete=models.CASCADE)

    @property
    def collapse(self):
        return Navigation.objects.filter(parent=self.pk, is_active=True).order_by("order")

    class Meta:
        ordering = ('-pk',)

    def __unicode__(self):
        return u'%s' % self.name

    def __str__(self):
        return u'%s' % self.name

    class Meta:
        verbose_name = "Navigation"
        verbose_name_plural = "Navigations"

