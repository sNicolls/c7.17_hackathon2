/////////////JAVASCRIPT/////////////

//onLoad, apply click handlers to the buttons
$(document).ready(applyClickHandlers);
function applyClickHandlers(){
    console.log("Applying handlers");
    $("#submit_button").on("click", formSubmission);
    $("#return_to_home").on("click", returnToHomePage);
    $("#yes_button").on("click", fishOn);
}
//A couple of functions to generate random numbers and using them to parse arrays
function randomSelector(array){
    return array.splice(r_n_g(0, array.length), 1)
}
function r_n_g(lowNum, highNum) {
    return Math.floor(Math.random() * (highNum - lowNum + 1) + lowNum);
}

//Gets the value of the input form and sends it to ClarifAI for visual analysis
function formSubmission(){
    var imageURL = $("#input_form").val();
    predictionPromise(imageURL);
}

//Ajax call to ClarifAI that takes in a url and returns an object containing a list of keywords
var predictionsArray = [];
const app = new Clarifai.App({
    apiKey: 'e1fb6f596ca44bd2ac0bd6a608906b9e'
});

function makePredictionsArray(imageURL) {
    return app.models.predict(Clarifai.GENERAL_MODEL, imageURL);
}

//this function is called in the success portion of the promise, making it a fine place to define functionality that is dependant on having a populated predictionsArray
function makeArrayFromResponseObject(responseObject) {
    var arrayWeNeed = responseObject.outputs[0].data.concepts;
    for (var i = 0; i < arrayWeNeed.length; i++) {
        predictionsArray.push(arrayWeNeed[i].name);
    }
    var keyWord = randomSelector(predictionsArray);
    iTunesQuery(keyWord);
}

var predictionPromise = function(imageURL){
    console.log("making promises");
    makePredictionsArray(imageURL)
        .then(
            function (response) {
                makeArrayFromResponseObject(response);
                console.log("I was able to make this array:", predictionsArray);
            },
            function (err) {
                console.log(err)
            });
};

//Takes in a keyword and returns an object from YouTube that contains video URL's
function fishOn(searchKeyWord){
    console.log("FISH ON DAWG")
    var youtube_results;
    var youtube_id;
    var youtubekey = "https://www.googleapis.com/youtube/v3/search?type=video&q="+ 'fish' + searchKeyWord +"&maxResults=10&part=snippet&key=AIzaSyAsYUCZFGPolUbZChLMmmX9Za7XHJVbOyg";

        $.ajax({
            dataType: 'json',
            url: youtubekey,
            success: parseYoutubeObject
        });
}
//Breaks down the YouTube object into and array of video URL's
function parseYoutubeObject(object){
    videoArray = [];
    console.log(object.items);
    for(var i = 0; i < object.items.length; i++){
        videoArray.push("https://www.youtube.com/embed/" + object.items[i].id.videoId)
    }
    console.log(randomSelector(videoArray))
    createListeningEnvironment(randomSelector(videoArray))
}


function returnToHomePage(){
    window.open("index.html", "_self")
}


//Ajax call that takes in a keyword and returns an object containing a list of songs from iTunes
function iTunesQuery(keyWord){
    //var searchTerm = 'fish';
    var url = 'https://itunes.apple.com/search?term=' + keyWord;
    $.ajax({
        dataType: 'json',
        url: url,
        success: function(response){
            parseItunesQuery(response, keyWord)
        }
    })
}
//Breaks down the iTunes object into an array of songs
function parseItunesQuery(response, keyWord){
    var a;
    var music_array = [];
    var music_url = response;
    console.log("ITUNES RESPONSE", response)
    for(var i=0;i<10;i++){
        music_array.push(music_url.results[i]);
        }
    $(".border_top_bottom").append("<button id='bass_drop'>Drop the Bass</button>")
    $("#bass_drop").on("click", function(){fishOn(keyWord)})
    //createListeningEnvironment()
    console.log("MUSIC ARR", music_array)
    var random_song = randomSelector(music_array)
    var artistName = random_song[0].artistName;
    var trackName = random_song[0].trackName;
    a = new Audio(random_song[0].previewUrl);
    a.play();
    a.onended = function(){displayArtist(artistName, trackName)};
}

 function displayArtist(artistName, trackName){
     $(".border_top_bottom").html("")
     $(".border_top_bottom").append(artistName, trackName)
 }

//Alters the view to display what the user should see once a song starts playing
function createListeningEnvironment(youTubeURL){
    var urlString = youTubeURL.toString();
    console.log("URL STRING", urlString)
    $(".border_top_bottom").html("")
    $(".border_top_bottom").append("<iframe src=' "+ urlString + "' </iframe>")
    $(".border_top_bottom").append("<button id='reset_yo_self'>RESET</button>")
    $("#reset_yo_self").on("click", function(){
        location.reload();
    })
}





