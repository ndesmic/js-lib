export const arrayFlatMap = (array, mapFunc) => array.reduce((agg, x) => {
	agg.push(...mapFunc(x));
	return agg;
}, []);

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