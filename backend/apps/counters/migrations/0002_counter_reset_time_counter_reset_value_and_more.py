# Generated by Django 5.1.3 on 2024-11-20 04:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('counters', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='counter',
            name='reset_time',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='counter',
            name='reset_value',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='counter',
            name='start_time',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='counter',
            name='type',
            field=models.CharField(default='normal', max_length=128),
        ),
    ]
