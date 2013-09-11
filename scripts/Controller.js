function Controller() {  
	jQuery(window).keypress(function(e) {
		var pressed = String.fromCharCode(e.which)
					  .toLowerCase();
		
		if (pressed == 'a')
			planet.moveLeft();
		else if (pressed == 'd')
			planet.moveRight();
		else if (pressed == 'w')
			planet.moveUp();
		else if (pressed == 's')
			planet.moveDown();
		else if (pressed == 'q')
			planet.rotateAnticlockwise();
		else if (pressed == 'e')
			planet.rotateClockwise();
	});
}