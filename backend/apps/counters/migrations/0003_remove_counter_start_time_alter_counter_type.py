# Generated by Django 5.1.3 on 2024-11-20 04:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('counters', '0002_counter_reset_time_counter_reset_value_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='counter',
            name='start_time',
        ),
        migrations.AlterField(
            model_name='counter',
            name='type',
            field=models.IntegerField(choices=[(0, 'normal'), (1, 'hourly'), (2, 'daily'), (3, 'weekly'), (4, 'monthly'), (5, 'yearly')], default=0),
        ),
    ]
