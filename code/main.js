/**
 * Created by shanenicolls on 8/22/17.
 */


/////////////ClarifAI API///////////
/*Takes in an image's url or image file
     Returns An Object Containing the Predictions
 */

var predictionsArray = [];

makePredictionsArray('https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg')
    .then(
        function (response) {
            makeArrayFromResponseObject(response);
            console.log("I was able to make this array:", predictionsArray);


        },
        function (err) {
            console.log(err)
        });


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
