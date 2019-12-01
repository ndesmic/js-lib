export function chainPromise(promiseArray, initialValue){
	let promise = Promise.resolve(initialValue);
	for(let i = 0; i < promiseArray.length; i++){
		promise = promise.then((...x) => array[i](...x));
	}
	return promise;
}
