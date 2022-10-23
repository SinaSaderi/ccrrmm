# Generated by Django 4.1.1 on 2022-10-03 15:26

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0007_user_related_users'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='related_users',
            new_name='users_1',
        ),
        migrations.AddField(
            model_name='user',
            name='users_2',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
