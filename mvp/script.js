var geocoder;
var map;
//var searchTerm = json._embedded.events[0]._embedded.attractions[0].name;
var youtubeAPIKey = "AIzaSyDzcsnOAwEH0QA9xZbp9HCRQRPK323Ircw";
const flexChild = document.getElementsByClassName("flex-child");
const city = localStorage.getItem('address');
const startDate = localStorage.getItem('startDate');
const endDate = localStorage.getItem('endDate');
// GEOCODER INITIALIZE
function initialize() {
  geocoder = new google.maps.Geocoder();

}

function showContent() {
  document.getElementById("cardMap").style.display ="block";
  document.getElementById("card").style.display ="block"
  for (let i = 0; i < flexChild.length; i++) {
    flexChild[i].style.display = "block";
  }
}

//onclick
function codeAddress() {
  //takes user city input as a value, geocodes - results[0] = latlon
  var address = document.getElementById('address').value;
  localStorage.setItem('address', address);
  var startDate = document.getElementById('startDate').value;
  localStorage.setItem('startDate', startDate);
  var endDate = document.getElementById('endDate').value;
  localStorage.setItem('endDate', endDate);

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
                    console.log(json._embedded.events[0]._embedded.attractions[0].name)
                    //var e = document.getElementById("events");
                    //e.innerHTML = json.page.totalElements + " events found.";
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
//$("#eventImg").append("<p>" + json._embedded.events[0].images[0].url + "</p>");
//i<json.page.size for loop
//  getElementById("card").style.display ="block";
//  getElementById("cardMap").style.display ="block";

function showEvents(json) {

  for(var i=0; i<1; i++) {
    $("#eventName1").append("<h2 class='center-align' style='color:#E9C46A;'>"+json._embedded.events[0].name+"</h4>");
    $("#eventDate1").append("<h3 class='center-align' style='color:#F4A261;'>"+json._embedded.events[0].dates.start.localDate+"</p>");
    $("#eventLocation1").append("<p class='center-align' style='color:#E76F51;'>"+json._embedded.events[0]._embedded.venues[0].name+"</p>");
    $("#eventImage1").append("<img src='" + json._embedded.events[0].images[0].url + "'>");
  }
}


function initMap(results, json) {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()},
    zoom: 10
  });
  for(var i=0; i<1; i++) {
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