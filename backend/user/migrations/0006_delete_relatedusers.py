# Generated by Django 4.1.1 on 2022-10-03 15:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_relatedusers'),
    ]

    operations = [
        migrations.DeleteModel(
            name='RelatedUsers',
        ),
    ]