function Controller() {

    var mouseDown = false;
    jQuery(window).mousedown(function(e) {
        mouseDown = true;
    });

    jQuery(window).mouseup(function(e) {
        mouseDown = false;
    })

    var senstivity = 0.01;
    var DOUBLE_PI = 6.28;
    jQuery(window).mousemove(function(e) {
        if (mouseDown) {
            yRotation = ((-2000 + e.pageY) * senstivity) % (DOUBLE_PI);
            xRotation = ((-2000 + e.pageX) * senstivity) % (DOUBLE_PI);
        }
    });

    jQuery(window).bind('mousewheel', function(e) {
        var delta = e.originalEvent.deltaY;
        var IsZoomingOut = delta > 0;
        var WithinZoomOutLimit = zoom > -2000;
        var IsZoomingIn = IsZoomingOut == false;
        var WithinZoomInLimit = zoom < -500;

        var CanZoomInOrOut = IsZoomingOut && WithinZoomOutLimit || IsZoomingIn && WithinZoomInLimit;
        if (CanZoomInOrOut) {
            zoom -= e.originalEvent.deltaY;
        }
    });

    this.IncreaseTime = function() {
				clock_increment += 0.01;
    }

    this.DecreaseTime = function() {
        clock_increment -= 0.01;
    }
}
