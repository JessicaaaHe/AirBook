var map;
var markers = [];
function initMap() {   //init map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng(40.746257652825314,-73.99628102640968)
    });
    //add
    google.maps.event.addListener(map, 'click', function (event) {
        latLong = event.latLng;
        update_timeout = setTimeout(function () {
            coordinates = event.latLng;
            latitude = coordinates['lat']();
            longitude = coordinates['lng']();
            this.map.setCenter(latLong);
            this.map.setZoom(14);
        }, 200);
    });
    //Ignore double clicks
    google.maps.event.addListener(map, 'dblclick', function (event) {
        clearTimeout(update_timeout);
    });
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

function getRoomType(keyWord) {
    roomtype = keyWord;
}

function searchKeyWord() {
    setMapOnAll(null);
    markers = [];
    var keyword = document.getElementsByName("keyword")[0].value;

    if(keyword != undefined && roomtype != undefined){
        var url = 'json/'.concat(keyword).concat('/').concat(roomtype).concat('/');
        $.getJSON(url,parseJSON);
    }
}

function parseJSON(data, status, xhr) {
    markers = [];
    for (var i = 0; i < data.length; i++){
        var id = data[i]['properties']['id'];
        var marker = new google.maps.Marker({
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 2,
                fillOpacity: 1,
                fillColor: "#ff332c",
                strokeColor: "#ff332c"
            },
            position: {lat: parseFloat(data[i]['geometry']['coordinates'][0]), lng: parseFloat(data[i]['geometry']['coordinates'][1])},
            map: map,
            id: id
        });
        markers.push(marker);
    }
}