"use strict";
var ObjectTools = (function(){

	function isPlainObject(value){
		if(typeof(value) !== "object" || value === null){
			return false;
		}
		if(value.nodeType){
			return false;
		}
		if(value.constructor && !Object.prototype.hasOwnProperty.call(value.constructor.prototype, "isPrototypeOf" )){
			return false;
		}

		return true;
	}

	function extend() {
		var target = arguments[0] || {};
		var sources = Array.prototype.slice.call(arguments, 1);
		for(var i = 0; i < sources.length; i++){
			var source = sources[i];
			for (var prop in source) {
			  if (isPlainObject(source[prop])) {
				target[prop] = extend(target[prop], source[prop]);
			  } else {
				target[prop] = source[prop];
			  }
			}
		}
		return target;
	}

	function promiseStub(){
		return new Promise(function(resolve, reject){
			resolve();
		});
	}
	
	//Takes object of form { a : [], b : [], c : [] } and converts to [{a, b, c},...]
	function unpivot(pivotObject){
		var maxLength = 0;
				
		for(let key in pivotObject){
			maxLength = Math.max(pivotObject[key].length, maxLength);
		}
		
		var unpivotObjs = [];
		for(let i = 0; i < maxLength; i++){
			var unpivotObj = {};
			for(let key in pivotObject){
				if(pivotObject[key][i]){
					unpivotObj[key] = pivotObject[key][i];
				}
			}
			unpivotObjs.push(unpivotObj);
		}
		return unpivotObjs;
	}
	
	function searchMap(map, key){
		for(var currentKey in map){
			if(currentKey == key){
				return map[key];
			}
		}
		return null;
	}

  return {
    isPlainObject : isPlainObject,
    extend : extend,
    promiseStub : promiseStub,
    searchMap : searchMap
  };

})();
