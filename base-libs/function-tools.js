var FunctionTools = (function() {
    function noop() {}
    function getFunctionName(functionText) {
        return functionText.match(/function ([^\(]+)/)[1];
    }
    function getFunctionParams(func) {
        let argString = /^function\s*.*\((.*)\)/.exec(func.toString())[1];
        return argString.split(",").map(x => x.trim());
    }
    function getType(obj) {
        var constructor = obj.constructor.toString();
        return getFunctionName(constructor);
    }
    function wait(time) {
        return new Promise(function(resolve) {
            setTimeout(resolve, time);
        });
    }
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    }

    function trampoline(func){
        let result = func.apply(this, arguments);
        while(result instanceof Function){
            result = result();
        }
        return result;
    }

    return {
        noop: noop,
        getFunctionName: getFunctionName,
        getFunctionParams: getFunctionParams,
        wait: wait,
        debounce: debounce,
        trampoline: trampoline
    };
})();
