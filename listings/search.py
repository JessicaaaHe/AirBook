from elasticsearch import Elasticsearch, RequestsHttpConnection
#from requests_aws4auth import AWS4Auth
import math

host = 'search-listings-copyetrhi7huiyy2bd57lzrrdm.us-east-1.es.amazonaws.com'
#awsauth = AWS4Auth('', '', 'us-east-1', 'es')

es = Elasticsearch(
    hosts=[{'host': host, 'port': 443}],
    #http_auth=awsauth,
    use_ssl=True,
    verify_certs=True,
    connection_class=RequestsHttpConnection
)


def distance(lat1, lon1, lat2, lon2):
    dlat = deg2rad(lat2-lat1)
    dlon = deg2rad(lon2-lon1)
    a = math.sin(dlat/2) * math.sin(dlat/2) + math.cos(deg2rad(lat1)) * math.cos(deg2rad(lat2)) * math.sin(dlon/2) * math.sin(dlon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return 6371 * c


def deg2rad(deg):
    return deg * (math.pi/180)


def search(lat_a, lon_a, limit):
    result = es.search(index='listings', size=100)['hits']['hits']
    return [x for x in result if distance(lat_a, lon_a, float(x['_source']['latitude']), float(x['_source']['longitude'])) <= limit]