var FunctionTools = (function(){
  function noop(){
    
  }
  function getFunctionName(functionText){
	  return functionText.match(/function ([^\(]+)/)[1];
	}
	function getType(obj){
		var constructor = obj.constructor.toString();
		return getFunctionName(constructor);
	}
	function wait(time){
	  return new Promise(function(resolve){
	    setTimeout(resolve, time); 
	  });
	}
	function debounce(func, wait, immediate) {
	  var timeout;
	  return function() {
		  var context = this, args = arguments;
		  var later = function() {
			  timeout = null;
			  if (!immediate){ 
			    func.apply(context, args);
			  }
		  };
		  var callNow = immediate && !timeout;
		  clearTimeout(timeout);
		  timeout = setTimeout(later, wait);
		  if (callNow){ 
		    func.apply(context, args);
		  }
	  };
  }
  return {
    noop : noop,
    getFunctionName : getFunctionName,
    wait : wait,
    debounce : debounce
  };
})();