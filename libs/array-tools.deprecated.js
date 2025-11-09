/**
 * @deprecated replaced by native array.prototype.flatMap
 * @param {Array} array 
 * @param {(e:T) => T[]} mapFunc 
 * @returns 
 */
export const arrayFlatMap = (array, mapFunc) => array.reduce((agg, x) => {
	agg.push(...mapFunc(x));
	return agg;
}, []);

/**
 * @deprecated replaced by native array.prototype.flat
 * @param {Array} array 
 * @returns 
 */
export function arrayFlatten(array) {
	const resultArray = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i] instanceof Array) {
			resultArray = resultArray.concat(arrayFlatten(array[i]));
		} else {
			resultArray.push(array[i]);
		}
	}
	return resultArray;
}