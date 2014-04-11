function Controller() {  
	jQuery(window).keypress(function(e) {
		var pressed = String.fromCharCode(e.which)
					  .toLowerCase();
		if (pressed == 'w') zoom += 100;
		if (pressed == 's') zoom -= 100;
		if (pressed == 'p') rotation += 0.01;
		if (pressed == ';') rotation -= 0.01;
		if (pressed == 'a') clock_increment += 0.01;
		if (pressed == 'd') clock_increment -= 0.01;
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