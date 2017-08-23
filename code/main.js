/////////////JAVASCRIPT/////////////
//
$(document).ready(applyClickHandlers);

function applyClickHandlers(){
    console.log("Applying handlers")
    $("#submit_button").on("click", formSubmission);
    $("#return_to_home").on("click", returnToHomePage);
    $("#yes_button").on("click", fishOn);
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



//MAKE PREDICTIONS
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
    var keyWord = randomSelector(predictionsArray)
    iTunesQuery(keyWord)
    fishOn(keyWord)
}
//var whateverURL = 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg'


var predictionPromise = function(imageURL){
    console.log("making promises")
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

//YOUTUBE
function fishOn(searchKeyWord){
    var youtube_results;
    var youtube_id;
    var youtubekey = "https://www.googleapis.com/youtube/v3/search?type=video&q="+ 'fish' + searchKeyWord +"&maxResults=10&part=snippet&key=AIzaSyAsYUCZFGPolUbZChLMmmX9Za7XHJVbOyg";

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
    console.log(randomSelector(videoArray))
    //createIFrame(randomSelector(videoArray))
}
function createIFrame(youtubeURL){
    $("#video_display_area").html("<>")
}

function returnToHomePage(){
    window.open("index.html", "_self")
}


//ITUNES
function iTunesQuery(keyWord){
    //var searchTerm = 'fish';
    var url = 'https://itunes.apple.com/search?term=' + keyWord;
    $.ajax({
        dataType: 'json',
        url: url,
        success: parseItunesQuery
    })
}
function parseItunesQuery(response){
        var a;
        var music_array = [];
        var music_url = response;
        for(var i=0;i<10;i++){
            music_array.push(music_url.results[i].previewUrl);
        }
         console.log(randomSelector(music_array));
         a = new Audio(music_array[0]);
         a.play();

}


// function pause_audio(){
//     a.pause();
// }
// });




