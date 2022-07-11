var geocoder;
var map;

// GEOCODER INITIALIZE
function initialize() {
  geocoder = new google.maps.Geocoder();

}

//onclick
function codeAddress() {
  //takes user city input as a value, geocodes - results[0] = latlon
  var address = document.getElementById('address').value;
  var startDate = document.getElementById('startDate').value;
  var endDate = document.getElementById('endDate').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    console.log(results)
    var latlon = results[0].geometry.location.lat() + "," + results[0].geometry.location.lng()
    console.log(latlon)
    console.log(startDate)
    console.log(endDate)

    if (status == 'OK') {
      $.ajax({
        type:"GET",
        url:"https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=AGEiNjO7nGO6vJDiRVLhhsVBjgOHdQIb&latlong="+ latlon +"&startDateTime=" + startDate + "T00:00:00Z" +"&endDateTime=" + endDate + "T00:00:00Z",
        async:true,
        dataType: "json",
        success: function(json) {
                    console.log(json);
                    var e = document.getElementById("events");
                    e.innerHTML = json.page.totalElements + " events found.";
                    showEvents(json);
                    initMap(results, json);
                 },
        error: function(xhr, status, err) {
                    console.log(err);
                 }
      });
  

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}


function showEvents(json) {
  for(var i=0; i<json.page.size; i++) {
    $("#events").append("<h4>"+json._embedded.events[i].name+"</h4>");
    $("#events").append("<p>"+json._embedded.events[i].dates.start.localDate+"</p>");
  }
}

function initMap(results, json) {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()},
    zoom: 10
  });
  for(var i=0; i<json.page.size; i++) {
    addMarker(map, json._embedded.events[i]);
  }
}

function addMarker(map, event) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
    map: map
  });
  marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
  console.log(marker);
}