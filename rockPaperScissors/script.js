$(function() {
	"use strict";

	var computer = Math.floor(Math.random() * 3 + 1);

	var computerImage = $('#' + computer).clone().attr('id', '4').addClass("concealed").appendTo(".center");
	$('.placeholder').remove();

	var img = $('img');

	var button = $('button');

	function win (userID, computerID) {
		button.addClass("btn-outline-success");
		$('#' + userID).addClass("win");
		$('#' + computerID).addClass("lose");
		$('h1').text("WIN");
	}

	function lose (userID, computerID) {
		button.addClass("btn-outline-danger");
		$('#' + userID).addClass("lose");
		$('#' + computerID).addClass("win");
		$('h1').text("LOSE");
	}

	function draw (userID, computerID) {
		button.addClass("btn-outline-secondary");
		img.addClass("draw");
		$('h1').text("DRAW");
	}

	function showResults (userID, computerID) {
		if ((computerID % 3) + 1 == userID) {
			win(userID, 4);
		} else if ((userID % 3) + 1 == computerID) {
			lose (userID, 4);
		} else {
			draw (userID, 4);
		}
	}

	img.on('click', function() {
		var user = $(this);
		var userId = user.attr('id');
		$('img').hide().addClass("noTouch")
		user.fadeIn();
		computerImage.fadeIn().removeClass("concealed");
		showResults (userId, computer);
		button.hide().fadeIn().removeClass("concealed");
	});

	button.on('click', function() {
		location.href = location.href;
	});
});
