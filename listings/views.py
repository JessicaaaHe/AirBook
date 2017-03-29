from django.shortcuts import render
# Create your views here.
import googlemaps

gmaps = googlemaps.Client(key='#')


def index(request):
    keyword, roomtype = request.GET.get('keyword'), request.GET.get('roomtype')
    if keyword and roomtype:
        geocode_result = gmaps.geocode(keyword + ' ' + 'New York')[0]
        address = geocode_result['formatted_address']
        geometry = geocode_result['geometry']['location']
        return render(request, 'listings/index.html', {'address': address, 'geometry': geometry})
    else:
        return render(request, 'listings/index.html')
