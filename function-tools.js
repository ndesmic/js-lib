var FunctionTools = (function(){
  function noop(){
    
  }
  function getFunctionName(functionText){
	  return functionText.match(/function ([^\(]+)/)[1];
	}
	function wait(time){
	  return new Promise(function(resolve){
	    setTimeout(resolve, time); 
	  });
	}
  return {
    noop : noop,
    getFunctionName : getFunctionName,
    wait : wait
  };
})();