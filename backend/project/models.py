from django.db import models as models


class Project(models.Model):

    # Fields
    name = models.CharField(max_length=255)
    slug = models.SlugField(blank=True)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    last_updated = models.DateTimeField(auto_now=True, editable=False)
    area = models.CharField(max_length=200, blank=True, null=True)
    bedrooms = models.CharField(max_length=30, blank=True, null=True)
    start_size = models.CharField(max_length=100, blank=True, null=True)
    start_price = models.CharField(max_length=100, blank=True, null=True)
    down_payment = models.CharField(max_length=30, blank=True, null=True)
    payment_plan = models.CharField(max_length=30, blank=True, null=True)
    dld = models.CharField(max_length=30, blank=True, null=True)
    service_charge = models.CharField(max_length=30, blank=True, null=True)
    handover_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    commision = models.IntegerField(blank=True, null=True)
    contact = models.CharField(max_length=200, blank=True, null=True)

    # Relationship Fields
    builder = models.ForeignKey(
        'project.Builder',
        on_delete=models.CASCADE, related_name="projects", 
    )

    class Meta:
        ordering = ('-created',)

    def __unicode__(self):
        return u'%s' % self.slug


class Builder(models.Model):

    # Fields
    name = models.CharField(max_length=255)
    slug = models.SlugField(blank=True)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    last_updated = models.DateTimeField(auto_now=True, editable=False)


    class Meta:
        ordering = ('-created',)

    def __unicode__(self):
        return u'%s' % self.slug

class ProjectImage(models.Model):

    # Fields
    name = models.CharField(max_length=255)
    slug = models.SlugField(blank=True)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    last_updated = models.DateTimeField(auto_now=True, editable=False)
    image = models.ImageField()

    # Relationship Fields
    project = models.ForeignKey(
        'project.Project',
        on_delete=models.CASCADE, related_name="projectimages", 
    )

    class Meta:
        ordering = ('-created',)

    def __unicode__(self):
        return u'%s' % self.slug
