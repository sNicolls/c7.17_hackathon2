/**
 * Created by calebeichelberger on 8/22/17.
 */
$(document).ready(function(){
    $.ajax({
        method:'post',
        data: {
            api_key:'AIzaSyAsYUCZFGPolUbZChLMmmX9Za7XHJVbOyg'
        },
        dataType: 'json',
        success: function() {
            console.log("we in here")
        },
        error: function(){
            console.log("shit aint workin cuz");
        }
    })});
