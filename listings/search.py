from elasticsearch import Elasticsearch, RequestsHttpConnection
#from requests_aws4auth import AWS4Auth
import math
from django.http import HttpResponse

host = 'search-listings-copyetrhi7huiyy2bd57lzrrdm.us-east-1.es.amazonaws.com'
#awsauth = AWS4Auth('', '', 'us-east-1', 'es')

es = Elasticsearch(
    hosts=[{'host': host, 'port': 443}],
    #http_auth=awsauth,
    use_ssl=True,
    verify_certs=True,
    connection_class=RequestsHttpConnection
)


def search(lat_a, lon_a, range, roomtype, limit=1000):
    """Retrieves specific listings from elasticsearch

    Args:
        lat_a, lon_a: float
        range: str    '5km'
        roomtype: str
        limit: int    size of the records

    Returns:
        A list of dict
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
    return result


def searchByKeyword(request, keyword, roomtype): # return json list
    response = HttpResponse(content_type="application/json")
    return response