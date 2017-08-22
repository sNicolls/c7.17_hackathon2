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
        arrayForOthers.push(arrayWeNeed[i].name);
    }
}


var arrayForOthers = [];


makePredictionsArray('https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg')
    .then(makeArrayFromResponseObject,
        function (err) {
            console.log(err)
        });



console.log("I was able to make this array:", arrayForOthers);


// // predict the contents of an image by passing in a url
// app.models.predict(Clarifai.GENERAL_MODEL, 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg').then(
//     function(response) {
//         console.log(response);
//     },
//     function(err) {
//         console.error(err);
//     }
// );
