if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
	console.log( "Current Device is mobile" );
} else {
	console.log( "Current Device is Desktop" );
}