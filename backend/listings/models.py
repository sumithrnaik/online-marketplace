from django.db import models

class Listing(models.Model):
    title = models.CharField(max_length=100)
    price = models.CharField(max_length=20)
    location = models.CharField(max_length=100)
    image_url = models.ImageField(upload_to='images/', null=True, blank=True) 
    category = models.CharField(max_length=50, default='Electronics')