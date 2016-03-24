var TimeTools = (function(){
  
  function getTimezone(){
    var dateText = new Date().toString();
    return dateText.match(/\(([^}]*)\)/)[1];
  }
  
  return {
    getTimezone  
  };
  
})();