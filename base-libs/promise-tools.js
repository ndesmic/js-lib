var PromiseTools = (function(){
  
  function chainPromise(promiseArray, initialValue){
		var promise = Promise.resolve(initialValue);
		for(var i = 0; i < array.length; i++){
			promise = promise.then(array[i]);
		}
		return promise;
	}
	
	return{
	  chainPromise : chainPromise
	};
  
})();