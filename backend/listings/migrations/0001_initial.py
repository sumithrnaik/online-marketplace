# Generated by Django 5.1.1 on 2024-12-02 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('price', models.CharField(max_length=20)),
                ('location', models.CharField(max_length=100)),
                ('image_url', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('category', models.CharField(default='Electronics', max_length=50)),
            ],
        ),
    ]
