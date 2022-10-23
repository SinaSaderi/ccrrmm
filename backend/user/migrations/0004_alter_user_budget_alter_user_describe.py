# Generated by Django 4.1.1 on 2022-09-21 09:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_agent_lead_alter_user_describe'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='budget',
            field=models.BigIntegerField(blank=True, null=True, verbose_name='budget'),
        ),
        migrations.AlterField(
            model_name='user',
            name='describe',
            field=models.TextField(blank=True, null=True, verbose_name='orders'),
        ),
    ]