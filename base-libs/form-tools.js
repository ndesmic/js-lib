var FormTools = (function(){
    function findValidation(form){
        var inputs = form.querySelectorAll("input");
        for(var i = 0; i < inputs.length; i++){
            console.log(inputs[i].id, inputs[i].validity);
        }
    }
    
    return {
        findValidation : findValidation  
    };
})();
