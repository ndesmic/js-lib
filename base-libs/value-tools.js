var ValueTools = (function(){
  
  function coalesce(){
    var value;
    for(var i = 0; i < arguments.length; i++){
      if(arguments[i] !== null && arguments[i] !== undefined){
        return arguments[i];
      }
    }
  }
  
  return {
    coalesce
  };
  
})();