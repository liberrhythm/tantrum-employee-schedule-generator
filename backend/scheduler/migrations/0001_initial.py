# Generated by Django 2.2.6 on 2019-10-20 18:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('is_salon', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('primary_location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='emp_primary_loc', to='scheduler.Location')),
                ('secondary_location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='emp_secondary_loc', to='scheduler.Location')),
            ],
        ),
    ]
