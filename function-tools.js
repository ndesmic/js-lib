var FunctionTools = (function(){
  function noop(){
    
  }
  function getFunctionName(functionText){
	  return functionText.match(/function ([^\(]+)/)[1];
	}
  return {
    noop : noop,
    getFunctionName : getFunctionName
  };
})();