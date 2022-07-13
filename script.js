var geocoder;
var map;
var youtubeAPIKey = "AIzaSyDzcsnOAwEH0QA9xZbp9HCRQRPK323Ircw";
const searchTerm =""
const flexChild = document.getElementsByClassName("flex-child");
const city = localStorage.getItem('address');
const startDate = localStorage.getItem('startDate');
const endDate = localStorage.getItem('endDate');
// GEOCODER INITIALIZE
function initialize() {
  geocoder = new google.maps.Geocoder();

}

function showContent() {
  document.getElementById("cardMap").style.display ="flex";
  document.getElementById("card").style.display ="flex"
  for (let i = 0; i < flexChild.length; i++) {
    flexChild[i].style.display = "block";
  }
}

//onclick
function searchResults() {
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
        url:"https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&radius=50&unit=miles&apikey=AGEiNjO7nGO6vJDiRVLhhsVBjgOHdQIb&latlong="+ latlon +"&startDateTime=" + startDate + "T00:00:00Z" +"&endDateTime=" + endDate + "T00:00:00Z",
        async:true,
        dataType: "json",
        success: function(json) {
                    console.log(json);
                    console.log(json._embedded.events[0]._embedded.attractions[0].name);
                    const searchTerm = json._embedded.events[0]._embedded.attractions[0].name
                    console.log(searchTerm)
                    //var e = document.getElementById("events");
                    //e.innerHTML = json.page.totalElements + " events found.";
                    showEvents(json);
                    initMap(results, json);
                    eventDetails(json);
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
  for(var i=0; i<1; i++) {
    $("#eventName1").append("<h4 class='center-align' style='color:#E9C46A;'>"+json._embedded.events[0].name+"</h4>");
    $("#eventDate1").append("<h6 class='center-align' style='color:#F4A261;'>"+json._embedded.events[0].dates.start.localDate+"</h6>");
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
}

function eventDetails(json) {
  var searchTerm = json._embedded.events[0]._embedded.attractions[0].name
  console.log(searchTerm)
  fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${searchTerm}`)
    .then((result)=>{
      console.log(result)
      return result.json()
  }).then((data)=>{
    console.log(data)
      for (extract of data.extract)
      console.log(data.extract)
      let articleContainer = document.querySelector(".card-content")
          articleContainer.innerHTML += `<p>${data.extract}</p>`
      })
  
  // ** wikipedia article link section **
  var wikiArticle = document.getElementById("read-more");
  var aTag = document.createElement('a');
      aTag.setAttribute('href',`https://en.wikipedia.org/wiki/${searchTerm}`);
      aTag.innerText = "Read More!";
      wikiArticle.appendChild(aTag);

      fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${searchTerm}&key=${youtubeAPIKey}`,{credentials: 'omit'})
      .then((result)=>{
          console.log(result.json())
          // ^ if there is an issue uncomment this portion
          return result.json()
      }).then((data)=>{
          console.log(data)
          let videos = data.items
          let videoContainer = document.querySelector("youtube-container")
          for(video of videos){
              console.log(video)
              // ^ if there is an issue uncomment this portion
              videoContainer.innerHTML += `<p>${video.snippet.title}<p>
              <a href="https://www.youtube.com/embed/${video.id.videoId}">Watch here!</a>`
              // ^ changed to display links
      
          }
      })
// ** youtube playlist link section **
var youtubePlaylist = document.getElementById("watch-more");
var aTag = document.createElement('a');
  aTag.setAttribute('href',`https://www.youtube.com/results?search_query=${searchTerm}`);
  aTag.innerText = "See the top YouTube results here!";
  youtubePlaylist.appendChild(aTag);
}