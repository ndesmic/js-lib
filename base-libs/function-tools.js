export function noop() {}
export function getFunctionName(functionText) {
    return functionText.match(/function ([^\(]+)/)[1];
}
export function getFunctionParams(func) {
    let argString = /^function\s*.*\((.*)\)/.exec(func.toString())[1];
    return argString.split(",").map(x => x.trim());
}
export function getType(obj) {
    var constructor = obj.constructor.toString();
    return getFunctionName(constructor);
}
export function wait(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time);
    });
}
export function debounce(func, wait, immediate) {
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
export function trampoline(func){
    let result = func.apply(this, arguments);
    while(result instanceof Function){
        result = result();
    }
    return result;
}

export function executeAsProcess(func, ...args){
	const funcText = func.toString();
	const bodyText = funcText.match(/\{[\s\S]*\}/)[0];
	const argsText = funcText.match(/\(.*\)|[\s\S]*?(?=\=\>)/)[0];
	const workerBody = `
		self.addEventListener('message', function(e){
			const wrappedFunc = ${argsText} => ${bodyText};
			const result = wrappedFunc(...e.data);
			self.postMessage(result);
			self.close();
		});
	`;
	return new Promise((resolve, reject) => {
		const workerUrl = URL.createObjectURL(new Blob([workerBody], { type : "text/javascript" }));
		const worker = new Worker(workerUrl);
		worker.postMessage(args);
		worker.onmessage = (e) => resolve(e.data);
	});
}
export function stringToObjectUrl(text, mimeType){
	return URL.createObjectURL(new Blob([text], { type : mimeType }));
}
export function memo(func) {
    const memory = new Map();
    return function(...args){
        const argHash = JSON.stringify([...args]);
        if(memory.has(argHash)){
            return memory.get(argHash)
        } else {
            const result = func(...args);
            memory.set(argHash, result);
            return result;
        }
    }
}