/**
 * Created by shanenicolls on 8/22/17.
 */


/////////////ClarifAI API///////////
/*Takes in an image's url or image file
     Returns An Object Containing the Predictions
 */



/////////////SoundCloud API/////////
/*Takes in a String,
     Returns an Object containing the songs
     Can Also be Queried to Play a song
 */



/////////////YOUTUBE API////////////
/*Takes in a String,
     Returns an Object containing video query results
     Can Then Be Queried To Play a Video
 */




/////////////JAVASCRIPT/////////////
$(document).ready(applyClickHandlers);

function applyClickHandlers(){
    $("#submit_button").on("click", function(){
        console.log("clicked")
        window.open("listening.html")
    })
}