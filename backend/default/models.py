from django.db import models as models

class Navigation(models.Model):

    # Fields
    label = models.CharField(max_length=200)
    url = models.CharField(max_length=200, null=True, blank=True)
    icon = models.CharField(max_length=200, null=True, blank=True)
    slug = models.SlugField()
    component = models.CharField(max_length=200, null=True, blank=True)

    # Relationship Fields
    parent = models.ForeignKey("self", blank=True, null=True, on_delete=models.CASCADE)

    @property
    def childrens(self):
        return Navigation.objects.filter(parent=self.pk).order_by("order")

    class Meta:
        ordering = ('-pk',)

    def __unicode__(self):
        return u'%s' % self.slug

    class Meta:
        verbose_name = "Navigation"
        verbose_name_plural = "Navigations"

