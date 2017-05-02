var map;
var markers = [];
function initMap() {   //init map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng(40.7128, -74.0059)
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
    $('#rt_text').fadeOut('slow');
    $('#average_price').fadeOut('slow');
    $('#low_price').fadeOut('slow');
    $('#loc_score').fadeOut('slow');
    $('#chartContainer').fadeOut('slow');
    $('#chartContainer2').fadeOut('slow');

    setMapOnAll(null);
    markers = [];
    var keyword = document.getElementsByName("keyword")[0].value;
    if(keyword != undefined && roomtype != undefined){
        var url = 'json/'.concat(keyword).concat('/').concat(roomtype).concat('/');
        $.getJSON(url,parseJSON);
    }

}

function parseJSON(data, status, xhr){
    markers = [];
    var total_price = 0;
    var total_score = 0;
    var low_price = 10000;
    var c_loc = 0;
    var loc_dis = [0,0,0,0,0,0,0,0,0,0,0];
    var prc_dis = [0,0,0];

    for (var i = 0; i < data.length; i++){
        var fillcolor = "#ff332c";
        var id = data[i]['properties']['id'];
        var price = data[i]['properties']['price'];
        var s_loc = data[i]['properties']['loc_score'];

        total_price += price;
        if(s_loc >= 0) {
            total_score += s_loc;
            c_loc += 1
            loc_dis[s_loc] += 1
        }

        if(price < 120.0 && price >= 80.0) {
            prc_dis[1] += 1;
            fillcolor = "#e6b800";
        }
        else if (price < 80.0) {
            prc_dis[0] += 1;
            fillcolor = "#228B22";
        }
        else{
            prc_dis[2] += 1
        }
        if(price < low_price)
            low_price = price;

        var marker = new google.maps.Marker({
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 2,
                fillOpacity: 1,
                fillColor: fillcolor,
                strokeColor: fillcolor,
            },
            position: {lat: parseFloat(data[i]['geometry']['coordinates'][0]), lng: parseFloat(data[i]['geometry']['coordinates'][1])},
            map: map,
            id: id
        });
        markers.push(marker);
    }

    var avg_loc_score = total_score/c_loc;

    map.setCenter(new google.maps.LatLng(data[0]['geometry']['coordinates'][0],data[0]['geometry']['coordinates'][1]));
    map.setZoom(14);
    $('#rt_text').text('For ' + roomtype + ' Around '+ document.getElementsByName("keyword")[0].value).fadeIn("slow");
    $('#average_price').text("The average price is $" + total_price/100.0).fadeIn("slow");
    $('#low_price').text("The lowest price is $" + low_price).fadeIn("slow");
    $('#loc_score').text("The Average Location Rating is " + avg_loc_score).fadeIn("slow");
    $('#chartContainer').fadeIn("slow");
    showchart(loc_dis);
    $('#chartContainer2').fadeIn("slow");
    showchart2(prc_dis);
}