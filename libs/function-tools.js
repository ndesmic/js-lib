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

export function trampoline(func){
    let result = func.apply(this, arguments);
    while(result instanceof Function){
        result = result();
    }
    return result;
}

export function executeAsWorker(func, ...args){
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
export function throttle(func, ms) {
    let pending = false;

    return function(...args){
        if(!pending){
            func(...args);
            setTimeout(() => {
                pending = false;
            }, ms);
            pending = true;
        }
    }
}

export function debounce(func, ms) {
    let timeout = null;

    return function(...args){
        clearTimeout(timeout);
        timeout = setInterval(() => func(...args), ms);
    };
}

export function exponentialBackoff(func, options = {}){
    const baseTimeoutMs = options.baseTimeoutMs ?? 1000;
    const maxTries = options.maxTries ?? 5;
    const isPass = options.condition ?? (x => !!x);

    return async function(...args){
        let result;
        let tries = 0;
        let isError = false;
        const errors = [];

        do {
            isError = false;
            await wait(baseTimeoutMs ** tries);
            try {
                result = await func(...args);
            } catch(e){
                errors.push(e);
                isError = true;
            }
            tries++;
        } while((isError || !isPass(result)) && tries < maxTries);

        if(!isPass(result)){
            if(Object.hasOwn(options, "defaultValue")) return options.defaultValue;
            throw new Error(errors.map(x => x.message).join(", "));
        }
        return result;
    }
}