var map;
var markers = [];
function initMap() {   //init map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng(40.706674, -73.956948)
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
    $('#chart_link').removeClass('active');
    $('#basic_link').addClass('active');
    $('#tabs-1').fadeOut('slow');
    $('#tabs-2').fadeOut('slow');

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
    var low_url = '';
    var nb_overview = '';
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
            prc_dis[2] += 1;
        }

        if(data[i]['properties']['neighborhood_overview'].length > nb_overview.length)
            nb_overview = data[i]['properties']['neighborhood_overview'];

        if(price < low_price) {
            low_price = price;
            low_url = data[i]['properties']['url'];
        }
        var marker = new google.maps.Marker({
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4,
                fillOpacity: 1,
                fillColor: fillcolor,
                strokeColor: fillcolor,
            },
            position: {lat: parseFloat(data[i]['geometry']['coordinates'][0]), lng: parseFloat(data[i]['geometry']['coordinates'][1])},
            map: map,
            id: id
        });
        attachSecretMessage(marker, data[i]['properties']);
        markers.push(marker);
    }

    var avg_loc_score = total_score/c_loc;

    map.setCenter(new google.maps.LatLng(data[0]['geometry']['coordinates'][0],data[0]['geometry']['coordinates'][1]));
    map.setZoom(14);

    $('#rt_text').text('For ' + roomtype + ' Around '+ document.getElementsByName("keyword")[0].value);
    $('#average_price').text(total_price/data.length);
    $('#low_price').text(low_price);
    $('#loc_score').text(avg_loc_score);
    $('#neighborhood_overview').text(nb_overview);

    $('#book_low').wrap('<a href=' + low_url +' />');
    $('#info-bar').fadeIn('slow');
    $('#tabs-1').fadeIn('slow');
    num_animation();
    //$('#chartContainer').fadeIn("slow");
    showchart(loc_dis);
    //$('#chartContainer2').fadeIn("slow");
    showchart2(prc_dis);
}

function attachSecretMessage(marker, property) {
  var infowindow = new google.maps.InfoWindow({
    content: " <div style=' width:100px;max-width:100px;' >" + property['name']+ " </div> " +
      " <img src=' "+ property['picture_url'] + " ' width='100px'> "
  });

  marker.addListener('mouseover', function() {
    infowindow.open(marker.get('map'), marker);
  });

    marker.addListener('mouseout', function() {
    infowindow.close()});

  marker.addListener('click', function() {
    window.location.href = property['url'];

});
}