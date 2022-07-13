// ** youtube api section **
var searchTerm = "pj harvey";
    //^ this will change depending on user input
var youtubeAPIKey = "AIzaSyDzcsnOAwEH0QA9xZbp9HCRQRPK323Ircw";

fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${searchTerm}&key=${youtubeAPIKey}`,{credentials: 'omit'})
.then((result)=>{
    // console.log(result.json())
    // ^ if there is an issue uncomment this portion
    return result.json()
}).then((data)=>{
    console.log(data)
    let videos = data.items
    let videoContainer = document.querySelector(".youtube-container")
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
    aTag.innerText = "Watch More!";
    youtubePlaylist.appendChild(aTag);
    
    
// ** wikipedia api section **
// fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=&prop=revisions&rvprop=content&format=json&formatversion=2&origin=*`)
fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${searchTerm}`)
.then((result)=>{
    console.log(result)
    return result.json()
}).then((data)=>{
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