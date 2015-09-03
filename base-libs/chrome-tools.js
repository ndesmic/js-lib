var ChromeTools = (function(){
  
    function isApp(){
      return !!chrome.runtime.id;
    }
  
    return {
      isApp : isApp
    };
  
})();