# Generated by Django 4.1.1 on 2022-09-19 15:49

import django.contrib.auth.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_salemanager_alter_user_addr'),
    ]

    operations = [
        migrations.CreateModel(
            name='Agent',
            fields=[
            ],
            options={
                'verbose_name': 'Agent',
                'verbose_name_plural': 'Agents',
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('user.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Lead',
            fields=[
            ],
            options={
                'verbose_name': 'Lead',
                'verbose_name_plural': 'Leads',
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('user.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.AlterField(
            model_name='user',
            name='describe',
            field=models.TextField(blank=True, null=True, verbose_name='describe'),
        ),
    ]