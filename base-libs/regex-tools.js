let RegexTools = (function(){
  
  function getCaptureMatches(text, regex){
  	var match;
    var captureMatches = [];
    
    if(!regex.global){
      console.error("Must be a global regex");
      return;
    }
    
    match = regex.exec(text);
    
  	while(match !== null){
    	var capturedGroups = [];
      var i = 1;
      while(match.hasOwnProperty(i)){
      	capturedGroups.push(match[i]);
      	i++;
      }
      if(capturedGroups.length === 1){
      	captureMatches.push(capturedGroups[0]);
      }
    	if(capturedGroups.length > 1){
  			captureMatches.push(capturedGroups);
      }
      match = regex.exec(text);
  	}
    return captureMatches;
  }
  
  return {
    getCaptureMatches : getCaptureMatches
  };
  
})();