# Generated by Django 4.1.1 on 2022-10-03 15:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0008_rename_related_users_user_users_1_user_users_2'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='users_1',
            new_name='related_users',
        ),
        migrations.RemoveField(
            model_name='user',
            name='users_2',
        ),
    ]