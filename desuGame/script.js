$(function() {
	var $input = $('input');
	var $listGroup = $('.list-group');

	$input.focus();

	// start the game if valid input
	function checkInput(e) {
		var $inputVal = $input.val();
		if (e.which == 13 && $inputVal) {
			if ($inputVal > 0 && $inputVal <= 10) {
				$('.input-group').remove();
				game($inputVal);
			} else {
				alert ("Please enter a number between 1 and 10 :3");
			}
		}
	}

	function game(number) {
		for (var i = 0; i < number; ++i) {
			var button = document.createElement('button');
			button.className = "list-group-item btn btn-block";
			button.setAttribute("id", i + 1);
			$(button).text("desu");
			$listGroup.append(button);
		}
		$listGroup.removeClass("hidden");
		var $buttons = $('button'); // link to desu buttons

		// animate starting display
		$buttons.hide().each(function(item) {
			$(this).delay(100 * item).slideDown(500).removeClass("hidden");
		});

		// this is the correct desu
		var random = Math.floor((Math.random() * number) + 1);

		var desu = document.createElement('button'); // after-game button
		$desu = $(desu); // hehe jquery object xD
		$desu.addClass("btn btn-default btn-block hidden"); // adding some classes :3
		$listGroup.after($desu); // add it to the page but it is hidden :p

		// game
		$buttons.on('click', function(e) {
			$(this).slideUp();
			$buttons.each(function() {
				$(this).attr("disabled", "disabled"); // remove functionality :3
			});
			if (e.target.id == random) { // if tey clik teh right button :3
				$('html body').css('background-color','#00CC66');
				$desu.text("You won! Click to play again!");
			} else {
				$('html body').css('background-color', '#FF3232');
				$desu.text("You lost! Click to play again!");
			}
			$desu.fadeIn(1000).removeClass("hidden");
		});

		// reload if user wants to play again :3
		$desu.on('click', function() {
			location.reload();
		})
	}

	$input.on('keyup', function(e) {
		checkInput(e);
	});
});
