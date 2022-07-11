let btn = document.getElementById("searchBtn");


$('.dropdown-trigger').dropdown()
$('.dropdown-genre').dropdown()
$('.dropdown-other').dropdown()


btn.addEventListener("click",function(event){
    // take in values of inputs and store as variable
    var userInput = dateInput + locationInput
    // fetch()
    //append to page  
    event.preventDefault(event);

    function getInputFromTextBox() {
    var dateInput = document.getElementById("#date-range").value;
    console.log(dateInput)
    }

    function getInputFromTextBox() {
    var locationInput = document.getElementById("#location").value;
    alert(input);
    }  })


    // if (homePage.style.display !== "none"){
    //     homePage.style.display="none";
    // } else {
    //     homePage.style.display = "block"
    // };
  
// store data from input fields 

//get values out of inputs
//store in var
//fetch - var url
// var url = `https://api.myapi/${where}/something/${dateRange}` 

