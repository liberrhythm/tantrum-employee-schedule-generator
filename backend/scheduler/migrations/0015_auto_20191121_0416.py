# Generated by Django 2.2.6 on 2019-11-21 04:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scheduler', '0014_employeeassignment_current'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employeeassignment',
            name='current',
        ),
        migrations.AddField(
            model_name='employeeassignment',
            name='numWeeksSince',
            field=models.IntegerField(default=0),
        ),
    ]
