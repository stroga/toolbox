/*
*@file
*Provides some methods to work with objects
*/

/*
*@param {boolean} isDevelopmentMode
*	not mandatory parameter that turns on/off logs
*/
function makeObjectChanges(isDevelopmentMode) {

		var areLogsShown = !!isDevelopmentMode ? isDevelopmentMode : false;

		/*
		*Constructs a methods to work with objects
		*
		*@constructor
		*/
		function MethodsToWorkWithObjects() {}

		MethodsToWorkWithObjects.prototype.log = function(args) {
			if (areLogsShown) {
				return console.warn.bind(console, args)();
			}
			return function() { return; };
		};

		/*
		*Adds any element to array
		*
		*@param{Array} arr
		*	array should be passed 
		*@param{any} el
		*
		*@return
		*	new created array with added element
		*/
		MethodsToWorkWithObjects.prototype.addToArray = function(ar, el) {
			var _this = this;
			var arr = ar;
			if (Object.prototype.toString.call(arr).slice(8, -1) === "Array") {
				if (!!el) {
					arr.push(el);
				} else {
					_this.log("You forgot to pass 'el' parameter");
				}
			} else {
				_this.log("Please, use ARRAY ONLY!");
			}
			return arr;
		};


		/*
		*Adds only unique element to array
		*
		*@param{Array} arr
		*	array should be passed 
		*@param{String|Number} el
		*
		*@return
		*	new created array with added element if it was not already in the array
		*	otherwise, new created array without changes
		*/
		MethodsToWorkWithObjects.prototype.addUniqueToArray = function(ar, el) {
			var _this = this;
			var arr = ar;
			if (Object.prototype.toString.call(arr).slice(8, -1) === "Array") {
				if (!!el) {
					if (arr.indexOf(el) === -1) {
						arr.push(el);
					} else {
						_this.log("Such element exist already");
					}

				} else {
					_this.log("You forgot to pass 'el' parameter");
				}
			} else {
				_this.log("Please, use ARRAY ONLY!");
			}
			return arr;
		};

		/*
		*To delete element from the array
		*
		*@param{Array} arr
		*	array should be passed 
		*@param{String|Number} el
		*
		*@return
		*	new created array without removed element
		*/
		MethodsToWorkWithObjects.prototype.removeFromArray = function(ar, el) {
			var _this = this;
			var arr = ar;
			if (Object.prototype.toString.call(arr).slice(8, -1) === "Array") {
				if (!!el) {
					var indexOfElementToBeRemoved = arr.indexOf(el);
					if (indexOfElementToBeRemoved > -1) {
						arr.splice(indexOfElementToBeRemoved, 1);
						removeFromArray.apply(this, [arr, el]);
					} else {
						_this.log("There is no such element in the array");
					}
				} else {
					_this.log("You forgot to pass 'el' parameter");
				}
			} else {
				_this.log("Please, use ARRAY ONLY!");
			}
			return arr;
		};

		MethodsToWorkWithObjects.prototype.addPropToObj = function(obj, prop, val) {
			var _this = this;
			var objectModified = obj;
			if (Object.prototype.toString.call(objectModified).slice(8, -1) === "Object") {
				if (!!prop && !!val) {

					objectModified[prop] = objectModified[val];

				} else {
					_this.log("You forgot to pass 'prop' or 'val' parameters");
				}
			} else {
				_this.log("Please, use OBJECT ONLY!");
			}
			return objectModified;
		};

		MethodsToWorkWithObjects.prototype.removeObjectProp = function(obj, prop) {
			var _this = this;
			var objectModified = obj;
			if (Object.prototype.toString.call(objectModified).slice(8, -1) === "Object") {
				if (!!prop) {

					delete objectModified[prop];

				} else {
					_this.log("You forgot to pass 'prop' parameter");
				}
			} else {
				_this.log("Please, use OBJECT ONLY!");
			}
			return objectModified;
		};

		MethodsToWorkWithObjects.prototype.stringifyObj = function(o) {
			var _this = this;
			if (Object.prototype.toString.call(o).slice(8, -1) === "Array" ||
				Object.prototype.toString.call(o).slice(8, -1) === "Object") {
				return JSON.stringify(o);
			}
			_this.log("Please, use OBJECT or ARRAY ONLY!");
		};
		
		MethodsToWorkWithObjects.prototype.restoreObjFromString = function(stringifiedObj) {
			var _this = this;
			if (Object.prototype.toString.call(stringifiedObj).slice(8, -1) === "String") {
				try {
					var restoredObj = JSON.parse(stringifiedObj);
					return restoredObj;
				} catch (err) {
					_this.log("Something went wrong: " + err);
				}
			} else {
				return stringifiedObj;
			}
		};

		return new MethodsToWorkWithObjects();
	}

	/*
	*usage example:
	*	var modObj = makeObjectChanges();
	*	modObj.addUniqueToArray( [ 1, "24", "test" ], "unique" );  => [ 1, "24", "test", "unique" ]
	*	modObj.addUniqueToArray( [ 1, "24", ununique ], "ununique" );  => [ 1, "24", "ununique" ]
	*/
	