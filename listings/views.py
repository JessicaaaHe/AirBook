from django.shortcuts import render
from . import search
# Create your views here.
import googlemaps, json

gmaps = googlemaps.Client(key='AIzaSyAzqsrd9qkXn7qoQSJJwCkhIMM77OffJSI')


def index(request):
    keyword, roomtype = request.GET.get('keyword'), request.GET.get('roomtype')
    if keyword and roomtype:
        geocode_result = gmaps.geocode(keyword + ' ' + 'New York')[0]
        address = geocode_result['formatted_address']
        geometry = geocode_result['geometry']['location']
        count = len(json.loads(search.search(geometry['lat'], geometry['lng'], '1km', roomtype)))
        message = 'There are {} {} Listings on Airbnb nearby within 1km!'.format(count, roomtype)
        return render(request, 'listings/index.html', {'address': address, 'message': message})
    else:
        return render(request, 'listings/index.html')

