// ** youtube api section **
var searchTerm = "pj harvey";
    //^ this will change depending on user input
var youtubeAPIKey = "AIzaSyDzcsnOAwEH0QA9xZbp9HCRQRPK323Ircw";

fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${searchTerm}&key=${youtubeAPIKey}`)
.then((result)=>{
    // console.log(result.json())
    // ^ if there is an issue uncomment this portion
    return result.json()
}).then((data)=>{
    console.log(data)
    let videos = data.items
    let videoContainer = document.querySelector(".youtube-container")
    for(video of videos){
        // console.log(video.snippet.title)
        // ^ if there is an issue uncomment this portion
        videoContainer.innerHTML += `<iframe width="520" height="345" src="https://www.youtube.com/embed/${data.items[0].etag}" frameboarder="0" allow="autoplay;encrypted-media" alllowfullscreen></iframe>
        <p>${video.snippet.title}<p>`

    }
})

// ** youtube playlist link section **
var youtubePlaylist = document.getElementById("watch-more");
var aTag = document.createElement('a');
    aTag.setAttribute('href',`https://www.youtube.com/results?search_query=${searchTerm}`);
    aTag.innerText = "Watch More!";
    youtubePlaylist.appendChild(aTag);