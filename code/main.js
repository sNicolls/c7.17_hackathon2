/////////////JAVASCRIPT/////////////

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

//Takes in
function randomSelector(array){
    return array.splice(r_n_g(0, array.length), 1)
}

function fishOn(){

}


function r_n_g(lowNum, highNum) {
    var randomNumber = Math.floor(Math.random() * (highNum - lowNum + 1) + lowNum);
    return randomNumber;
}


function returnToHomePage(){
    window.open("index.html", "_self")
}