/////////////JAVASCRIPT/////////////

//onLoad, apply click handlers to the buttons
$(document).ready(applyClickHandlers);
function applyClickHandlers(){
    console.log("Applying handlers");
    $("#submit_button").on("click", formSubmission);
    $("#return_to_home").on("click", returnToHomePage);
    $('.no-button').on('click', function(){
        if(!a.paused) a.pause();
    })
    $(".input-group-addon").on("click",pullUpSampleImages);
    $(".yes-button").on("click", fishOn);
    $("#fishModal").on("click", function(){
        makeParticlesOnElement(document.querySelector('.yes-button'));
    });
}

function pullUpSampleImages(){
    console.log("pulling up sample images");
    $("#imagePicker").modal('toggle');
    putClickHandlersOnSampleImages();
}

function putClickHandlersOnSampleImages(){
    $("#imagePicker img").on("click",function(){
        $("#input_form").val(this.src)
        $("#imagePicker").modal('toggle');
    })
}

//onSubmit, takes form string and feeds it to Matt's Image recognition
function formSubmission(){
   // window.open("listening.html", "_self")
    console.log("FORM SUBMIT")
    var imageURL = $("#input_form").val();

    console.log(imageURL)
    predictionPromise(imageURL);

}

function randomSelector(array){
    return array.splice(r_n_g(0, array.length), 1)
}
function r_n_g(lowNum, highNum) {
    var randomNumber = Math.floor(Math.random() * (highNum - lowNum + 1) + lowNum);
    return randomNumber;
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

//pass in an image url and you will receive an array of strings that describe that object, or false if there was a problem
function makePredictionsArray(imageURL) {
    return app.models.predict(Clarifai.GENERAL_MODEL, imageURL);
}
function makeArrayFromResponseObject(responseObject) {
    var arrayWeNeed = responseObject.outputs[0].data.concepts;
    for (var i = 0; i < arrayWeNeed.length; i++) {
        predictionsArray.push(arrayWeNeed[i].name);
    }

    var keyWord = randomSelector(predictionsArray);
    console.log("KEYWORD", keyWord)
    iTunesQuery(keyWord);
}

var predictionPromise = function(imageURL){
    console.log("making the first promise: getting image predictions from clarifai")
    makePredictionsArray(imageURL)
        .then(
            function (response) {
                console.log("Clarifai success!");
                makeArrayFromResponseObject(response);
                console.log("I was able to make this array:", predictionsArray);
            },
            function (err) {
                console.log(err)
            });
};

//Takes in a keyword and returns an object from YouTube that contains video URL's
// function fishOn(searchKeyWord){
//     var youtube_results;
//     var youtube_id;
//     var youtubekey = "https://www.googleapis.com/youtube/v3/search?type=video&q="  + searchKeyWord + 'fish' + "&maxResults=10&part=snippet&key=AIzaSyAsYUCZFGPolUbZChLMmmX9Za7XHJVbOyg";
//
//         $.ajax({
//             dataType: 'json',
//             url: youtubekey,
//             success: parseYoutubeObject
//         });
// }
function fishOn(searchKeyWord){
    var searchArr= ["fish", "ocean", "fishing", "deep sea", "sea", "shark", "creepy fish", "spooky fish", "fish fight", "fisherman","fish outta water"];
    var searchHelper = searchArr[Math.floor(Math.random() * searchArr.length)];
    console.log(searchHelper);
    var youtube_results;
    var youtube_id;
    var youtubekey = "https://www.googleapis.com/youtube/v3/search?type=video&q="  + searchKeyWord + searchHelper + "&maxResults=10&part=snippet&key=AIzaSyAsYUCZFGPolUbZChLMmmX9Za7XHJVbOyg";

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
        videoArray.push("https://www.youtube.com/embed/" + object.items[i].id.videoId + "?start=30&autoplay=1")
    }
    console.log("RANDOM YOUTUBE LINK", randomSelector(videoArray))
    createIFrame(randomSelector(videoArray))
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
        success: parseItunesQuery
    })
}

//Breaks down the iTunes object into an array of songs
function parseItunesQuery(response, keyWord){
    var a;
    var music_array = [];
    var music_url = response;
    console.log("ITUNES RESPONSE", response)
    for(var i=0;i<20;i++){
        music_array.push(music_url.results[i]);
        }
    console.log("MUSIC ARR", music_array)
    var random_song = randomSelector(music_array)
    var artistName = random_song[0].artistName;
    var trackName = random_song[0].trackName;
    a = new Audio(random_song[0].previewUrl);
    a.play();
    a.onended = function(){displayArtist(artistName, trackName)};
    $("#fishModal").modal('toggle')
    $('.yes-button').on('click', function(){
        setTimeout(function(){ $("#fishModal").modal('toggle')}, 1000);
        fishOn(keyWord)
    })
    $('.no-button').on('click', function(){
        if(!a.paused) a.pause();
    })
}

 function displayArtist(artistName, trackName){
    $("#videoModal").modal('toggle');
    $("#artistModal").modal('toggle');
    $("#artist_and_song_text").append("<em>Artist:</em>", "<br>", artistName, "<br>", "<em>Song:</em>", "<br>", trackName);
    setTimeout(function(){location.reload}, 3000)
 }

//Alters the view to display what the user should see once a song starts playing
function createIFrame(youTubeURL){
    var urlString = youTubeURL.toString();
    console.log("URL STRING", urlString);
    $(".border_top_bottom").html("");
    $(".border_top_bottom").append("<iframe src=' "+ urlString + "' </iframe>");
    $(".border_top_bottom").append("<button class='all_buttons' id='reset_button' onclick='reloadApp()'>RESET</button>")
    $('iframe').mute()
}
function reloadApp(){
    location.reload()
}