/////////////JAVASCRIPT/////////////

//////TEST DATA
var predictionArr = ['horse', 'dog', 'cat']
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
    //MattFunc(imageURL)
    window.open("listening.html", "_self")
}

//MATT'S FUNC RUNS randomPrediction//



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
    console.log(object.items)
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



