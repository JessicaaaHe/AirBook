from django.shortcuts import render
from .lib import search
# Create your views here.
import googlemaps, json

gmaps = googlemaps.Client(key='AIzaSyAzqsrd9qkXn7qoQSJJwCkhIMM77OffJSI')


def index(request):
    keyword, roomtype = request.GET.get('keyword'), request.GET.get('roomtype')
    if keyword and roomtype:
        geocode_result = gmaps.geocode(keyword + ' ' + 'New York')[0]
        address = geocode_result['formatted_address']
        geometry = geocode_result['geometry']['location']

        geo_result = search.search(geometry['lat'], geometry['lng'], '1km', roomtype)
        count = len(json.loads(geo_result))
        message = 'There are {} {} Listings on Airbnb nearby within 1km!'.format(count, roomtype)
        return render(request, 'listings/index.html', {'address': address, 'message': message, 'data': geo_result})
    else:
        return render(request, 'listings/index.html')

