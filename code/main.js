/////////////JAVASCRIPT/////////////

//////TEST DATA
///////
$(document).ready(applyClickHandlers);

function applyClickHandlers(){
    $("#submit_button").on("click", formSubmission);
    $("#return_to_home").on("click", returnToHomePage);
    $("#yes_button").on("click", fishOn);
}


/*onSubmit, takes form string and feeds it to Matt's Image recognition*/
function formSubmission(){
    var imageURL = $("#input_form").val();
    makePredictionsArray(imageURL);
    window.open("listening.html", "_self")
}


////////////////MATTS
// instantiate a new Clarifai app passing in your api key.
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
}

var predictionsArray = [];

makePredictionsArray(imageURL)
    .then(
        function (response) {
            makeArrayFromResponseObject(response);
            console.log("I was able to make this array:", predictionsArray);


        },
        function (err) {
            console.log(err)
        });
////////////////MATTS


function randomSelector(array){
    return array.splice(r_n_g(0, array.length), 1)
}
function r_n_g(lowNum, highNum) {
    var randomNumber = Math.floor(Math.random() * (highNum - lowNum + 1) + lowNum);
    return randomNumber;
}



function fishOn(searchKeyWord){
    var youtube_results;
    var youtube_id;
    var youtubekey = "https://www.googleapis.com/youtube/v3/search?type=video&q="+ 'fish' +"&maxResults=10&part=snippet&key=AIzaSyAsYUCZFGPolUbZChLMmmX9Za7XHJVbOyg";

        $.ajax({
            dataType: 'json',
            url: youtubekey,
            success: parseYoutubeObject
        });
}

function parseYoutubeObject(object){
    videoArray = [];
    console.log(object.items);
    for(var i = 0; i < object.items.length; i++){
        videoArray.push("https://www.youtube.com/watch?v=" + object.items[i].id.videoId)
    }
    createIFrame(randomSelector(videoArray))
}
function createIFrame(youtubeURL){
    $("#video_display_area").html("<>")
}

function returnToHomePage(){
    window.open("index.html", "_self")
}

//////////////////ITUNES


// $( document ).ready(function(searchTerm) {

var music_url;
var music_array = [];
var a;

// function itunesConnect(/*searchTerm*/){
function iTunesQuery(keyWord){
    //var searchTerm = 'fish';
    var url = 'https://itunes.apple.com/search?term=' + keyWord;
    $.ajax({
        dataType: 'json',
        url: url,
        success: function(result) {
            music_url = result;
            for(var i=0;i<10;i++){
                music_array.push(music_url.results[i].previewUrl);
            }
            // console.log(music_array);
            a = new Audio(music_array[0]);
            // a.play();
        }
    })
}
function parseItunesQuery


// function pause_audio(){
//     a.pause();
// }
// });




