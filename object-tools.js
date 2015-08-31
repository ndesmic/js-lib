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
	
	function isEmpty(obj){
	  if(Array.isArray(obj)) {
			return obj.length === 0;
		}else if(typeof(obj) === "object"){
			var size = 0;
			for(var key in obj){
				if(obj.hasOwnProperty(key)){
				  size++;
				} 
			}
			return size === 0;
		}
	}
	
	function shallowClone(obj){
		var newObject = {};
		for(var key in obj){
			newObject[key] = obj[key];
		}
		return newObject;
	}
	
	function objectToArray(object, keyProp){
		var array = [];
		
		for(var key in object){
			var newObject = shallowClone(object[key]);
			if(keyProp){
				newObject[keyProp] = key;
			}
			array.push(newObject);
		}
		
		return array;
	}
	
	function diff(oldObject, newObject){
		var diffObject;
		if(typeof(oldObject) === "object"){
			diffObject = {};
			for(var key in oldObject){
				diffObject[key] = diff(oldObject[key], newObject[key]);
				if(!diffObject[key]){
					delete diffObject[key];
				}
			}
			if(isEmpty(diffObject)){
				return null;
			}
			return diffObject;
		}else if(Array.isArray(oldObject)){
			diffObject = [];
			var largest = oldObject.length > newObject.length ? oldObject.length : newObject.length;
			for(var i = 0; i < oldObject.length; i++){
				diffObject[i] = diff(oldObject[i], newObject[i]);
			}
			if(isEmpty(diffObject)) return null;
			return diffObject;
		}else{
			if(oldObject == newObject){
				return null;
			}else{
				if(!oldObject && newObject){
					return newObject;
				}else if(!newObject && oldObject){
					return oldObject;
				}else{
					return null;
				}
			}
		}
	}
	
	function objectIsSuperset(objectTest, objectControl){
		if(objectTest instanceof Array && objectControl instanceof Array){
			for(var i = 0; i < objectControl.length; i++){
				if(!objectIsSuperset(objectTest[key], objectControl[key])){
					return false;
				}
			}
		}else if(objectTest instanceof Object && objectControl instanceof Object){
			for(var key in objectControl){
				if(!objectIsSuperset(objectTest[key], objectControl[key])){
					return false;
				}
			}
		}else{
			if(objectTest != objectControl){
				return false;
			}
		}
		return true;
	}

  return {
    isPlainObject : isPlainObject,
    extend : extend,
    promiseStub : promiseStub,
    searchMap : searchMap,
    isEmpty : isEmpty,
    shallowClone : shallowClone,
    objectToArray : objectToArray,
    diff : diff,
    objectIsSuperset : objectIsSuperset
  };

})();
