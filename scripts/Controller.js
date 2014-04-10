function Controller() {  
	jQuery(window).keypress(function(e) {
		var pressed = String.fromCharCode(e.which)
					  .toLowerCase();
		
		if (pressed == 'a')
			planets.forEach(function(i){
				i.moveLeft();
			});
		else if (pressed == 'd')
			planets.forEach(function(i){
				i.moveRight();
			});
		else if (pressed == 'w')
			planets.forEach(function(i){
				i.moveUp();
			});
		else if (pressed == 's')
			planets.forEach(function(i){
				i.moveDown();
			});
		else if (pressed == 'q')
			planets.forEach(function(i){
				i.rotateAnticlockwise();
			});
		else if (pressed == 'e')
			planets.forEach(function(i){
				i.rotateClockwise();
			});
	});
}