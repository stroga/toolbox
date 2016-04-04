//native onclick event

var target = jQuery( ".btnContact" )[0];
if (document.dispatchEvent) { // W3C
	var oEvent = document.createEvent("MouseEvents");
	oEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, target);
	target.dispatchEvent(oEvent);
} else if (document.fireEvent) { // IE
	target.fireEvent("onclick");
}

/*#######################*/