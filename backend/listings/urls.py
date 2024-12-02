from django.urls import path
from .views import ListingView,ListingCreateView

urlpatterns = [
    path('api/listings/', ListingView.as_view(), name='listings'),
    path('api/list/', ListingCreateView.as_view(), name='listing-create'),
]