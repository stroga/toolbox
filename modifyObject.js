function MakeObjectChanges() {


		function methodsToWorkWithObjects() {

		}

		methodsToWorkWithObjects.prototype.log = console.warn.bind(console);

		methodsToWorkWithObjects.prototype.addToArray = function(ar, el) {
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

		methodsToWorkWithObjects.prototype.addUniqueToArray = function(ar, el) {
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


		methodsToWorkWithObjects.prototype.removeFromArray = function(ar, el) {
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
		methodsToWorkWithObjects.prototype.addPropToObj = function(obj, prop, val) {
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
		methodsToWorkWithObjects.prototype.removeObjectProp = function(obj, prop) {
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
		methodsToWorkWithObjects.prototype.stringifyObj = function(o) {
			var _this = this;
			if (Object.prototype.toString.call(o).slice(8, -1) === "Array" ||
				Object.prototype.toString.call(o).slice(8, -1) === "Object") {
				return JSON.stringify(o);
			}
			_this.log("Please, use OBJECT or ARRAY ONLY!");
		};
		methodsToWorkWithObjects.prototype.restoreObjFromString = function(stringifiedObj) {
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

		return new methodsToWorkWithObjects();
	}

	var modObj = MakeObjectChanges();