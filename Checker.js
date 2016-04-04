;(function(test) {
	"use strict";
	var checkoutIdentifiers = "checkout";
	var attempts = 100;


	var _name = test.pageID.replace(/\s/g, "_"),
		showFn = function() {
			var el = document.getElementById(test.name);
			if (el) el.parentNode.removeChild(el);
		};

	document.write("<style id='" + test.name + "' type='text/css'>" + test.hide + "{visibility: hidden !important;}</style>");
	setTimeout(showFn, 10000);

	function isTestPage (arrayData) {
		var isTest = false;
		loop:
		for ( var i = 0; i < arrayData.length; i++ ) {
			if ( arrayData[i] === checkoutIdentifiers ) {
				isTest = true;
				break loop;
			}
		}
		return isTest;
	}

	(function fnWait() {
		if ( test.checker() ) {
			//jQuery(function() {
				var pageInfo = app.tracking.Webtrekk.getContentIdParts();
				if ( isTestPage(pageInfo) ) {
					mmcore._async = true;
					mmcore.	SetPageID(test.pageID);
					mmcore.HideMaxyboxes = function() {};
					mmcore.CGRequest();
				} else {
					showFn();
				}
				
			//});
		} else if ( attempts-- ) {
			setTimeout(fnWait, 50);
		} else {
			showFn();
		}
	})();

})({
	hide: "body",
	name: 'T01_Login',
	pageID: "T01_Checkout",
	checker: function() {
		//return !!window.jQuery;
		return window.app && window.app.tracking && window.app.tracking.Webtrekk && window.app.tracking.Webtrekk.getContentIdParts() && !!app.tracking.Webtrekk.getContentIdParts().length && app.tracking.Webtrekk.getContentIdParts()[0] === "DE";
	}
});