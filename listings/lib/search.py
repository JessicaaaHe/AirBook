from elasticsearch import Elasticsearch, RequestsHttpConnection
#from requests_aws4auth import AWS4Auth
from django.http import HttpResponse
import googlemaps, json

host = 'search-airbookdata-34vdv2rkhajpuxvgtgxhuvr5hy.us-east-1.es.amazonaws.com'
#awsauth = AWS4Auth('', '', 'us-east-1', 'es')

es = Elasticsearch(
    hosts=[{'host': host, 'port': 443}],
    #http_auth=awsauth,
    use_ssl=True,
    verify_certs=True,
    connection_class=RequestsHttpConnection
)

gmaps = googlemaps.Client(key='AIzaSyAzqsrd9qkXn7qoQSJJwCkhIMM77OffJSI')


def search(request, keyword, roomtype):
    geocode_result = gmaps.geocode(keyword + ' ' + 'New York')[0]
    geometry = geocode_result['geometry']['location']
    geo_result = search_keyword(geometry['lat'], geometry['lng'], '1km', roomtype)

    try:
        print(len(geo_result))
        return HttpResponse(json.dumps(geo_result), content_type="application/json")
    except:
        print("error")


def search_keyword(lat_a, lon_a, range, roomtype, limit=100):
    """Retrieves specific listings from elasticsearch

    Args:
        lat_a, lon_a: float
        range: str    '5km'
        roomtype: str
        limit: int    size of the records

    Returns:
        list
    """
    search_query = {
        "query": {
            "bool": {
                "must": {
                    "match": {'room_type': roomtype}
                },
                "filter": {
                    "geo_distance": {
                        "distance": range,
                        "location": {
                            "lat": lat_a,
                            "lon": lon_a
                        }
                    }
                }
            }
        }
    }
    result = es.search(index='geo-search-index', size=limit, body=search_query)['hits']['hits']

    geo_result = []
    for house in result:
        #print(house)
        lc_sc = house['_source']['review_scores_location']
        geo_result.append({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [house['_source']['latitude'], house['_source']['longitude']]
            },
            "properties": {
                "id": house['_source']['id'],
                "price": float(house['_source']['price'][1:].replace(',', '')),
                "loc_score": int(lc_sc) if lc_sc else -1,
            }
        })
    return geo_result
