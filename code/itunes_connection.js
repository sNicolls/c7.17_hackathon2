
// $( document ).ready(function(searchTerm) {

var music_url;
var music_array = [];
var a;

	// function itunesConnect(/*searchTerm*/){
		
		var searchTerm = 'fish';
		var url = 'https://itunes.apple.com/search?term=' + searchTerm;
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


		function pause_audio(){
			a.pause();
		}
// });




  
