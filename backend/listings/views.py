import base64
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Listing
from .serializers import ListingSerializer

class ListingView(APIView):
    def get(self, request):
        listings = Listing.objects.all()
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data)
    

class ListingCreateView(APIView):
    def post(self, request):
        image = request.FILES.get('image_url') 

        if image:
            listing_data = {
                'title': request.data.get('title'),
                'price': request.data.get('price'),
                'location': request.data.get('location'),
                'category': request.data.get('category'),
                'image_url': image,
            }

            serializer = ListingSerializer(data=listing_data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)
