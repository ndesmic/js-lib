export function vectorCompare(elementCompare = (a, b) => a - b) {
	return function compare(arrayA, arrayB){
		const res = elementCompare(arrayA[0], arrayB[0]);
		if(res === 0){
			return compare(arrayA.slice(1), arrayB.slice(1));
		}
		return res;
	}
}