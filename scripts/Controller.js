function Controller() {  
	jQuery(window).keypress(function(e) {
		var pressed = String.fromCharCode(e.which)
					  .toLowerCase();
		/*
		if (pressed == 'a')
			//move camera left
		else if (pressed == 'd')
			//move camera right
		else if (pressed == 'w')
			//move camera up
		else if (pressed == 's')
			//move camera down
		else if (pressed == 'q')
			//rotate anti clockwise
		else if (pressed == 'e')
			//rotate clockwise
		*/
	});
}