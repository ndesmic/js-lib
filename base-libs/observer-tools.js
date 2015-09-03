var ObserverTools = (function(){
    
    function stopOnChange(object){
        Object.observe(object, function(){
           debugger; 
        });
    }
    
    return {
      stopOnChange : stopOnChange  
    };
    
})();