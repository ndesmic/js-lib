var ObjectTools = (function(){

	function isPlainObject(value){
		if(typeof(value) !== "object" || value === null){
			return false
		}
		if(value.nodeType){
			return false;
		}
		if(value.constructor && !Object.prototype.hasOwnProperty.call(value.constructor.prototype, "isPrototypeOf" )){
			return false;
		}

		return true
	}

	function extend() {
		var target = arguments[0];
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

  return {
    isPlainObject : isPlainObject,
    extend : extend,
    promiseStub : promiseStub
  };

})();