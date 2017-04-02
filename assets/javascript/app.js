$( document ).ready(function() {
// my array
var actions = ["Beyonce", "Taylor Swift", "Rihanna", "Betty White", "Whitney Houston", "Tyra Banks", "Oprah Winfrey","Kim Kardashian"];

//function that displays the gif buttons

function displayGifButtons() {
	$("#gifButtonsView").empty();
	for (var i = 0; i < actions.length; i++) {
		var gifButton = $("<button>");
		gifButton.addClass("action");
		gifButton.addClass("btn btn-primary")
		gifButton.attr("data-name", actions[i]);
		gifButton.text(actions[i]);
		$("#gifButtonsView").append(gifButton);
	}
}

//function to add new button

function addNewButton() {
	$("#addGif").on("click", function() {
		var action = $("#actionInput").val().trim();
		if (action == ""){
			return false;//no blank buttons
		}
		actions.push(action);

		displayGifButtons();
		return false;
		});
}

//function to remove last button
function removeLastButton() {
	$("removeGif").on("click", function() {
		actions.pop(action);
		displayGifButtons();
		return false;
	});

}

// function that displays the gifs

function displayGifs() {
	var action = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=8";
	
	$.ajax({
		url: queryURL,
		method: 'GET'
	})

	.done(function(response) {
		$("#gifsView").empty();
		//show results of gifs
		var results = response.data;
		if (results == ""){
			alert("There is not a giffy for this!");	
		}
		for (var i = 0; i<results.length; i++){
			//put gifs in a div
			var gifDiv = $("<div1>");
			//pull rating of gif
			var gifRating = $("<p>").text("Rating " + results[i].rating);
			gifDiv.append(gifRating);

			//pull gif
			var gifImage = $("<img>");
			gifImage.attr("src", results[i].images.fixed_height_small_still.url);
			//paused images
			gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
			//animated images
			gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
			//how images come in, already paused
			gifImage.attr("data-state", "still");
			gifImage.addClass("image");
			gifDiv.append(gifImage);
			//add new div to existing divs
			$("#gifsView").prepend(gifDiv);
		}
	});
}

//calls
//list of already created ladies
displayGifButtons();
addNewButton();
removeLastButton();
//event listeners
$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function() {
	var state = $(this).attr('data-state');
	if (state == 'still') {
		$(this).attr('src', $(this).data('animate'));
		$(this).attr('data-state', 'animate');
	}else {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}

	});

});
