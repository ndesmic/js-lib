function clamp(value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
	return Math.max(Math.min(value, max), min);
}

function wrap(value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
	const range = max - min;
	return value < min
		? max - Math.abs(min - value) % range
		: min + (value + range) % range;
}
function mirrorWrap(value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
	const range = max - min;
	const minDistance = Math.abs(min - value);
	const intervalValue = minDistance % range;
	if (value % (max + max) > max) return max - intervalValue //too high (mirrored)
	if (value >= max) return min + intervalValue; //to high (unmirrored)
	if (value < min && minDistance % (range + range) > range) return max - intervalValue; //too low (mirrored)
	if (value <= min) return min + intervalValue; //to low (mirrored)
	return value;
}
function lerp(start, end, normalValue) {
	return start + (end - start) * normalValue;
}
function getFractionalPart(num) {
	return Math.abs(num % 1);
}


/**
 * 
 * @param {number[]} array 
 * @param {number} integerIndex
 * @param {"clamp" | "wrap" | "mirror" | "value" | number } endBehavior 
 */
export function getIndexWithOob(array, integerIndex, endBehavior) {
	switch (endBehavior) {
		case "clamp": {
			return array[clamp(integerIndex, 0, array.length - 1)];
		}
		case "wrap": {
			return array[wrap(integerIndex, 0, array.length - 1)];
		}
		case "mirror": {
			return array[mirrorWrap(integerIndex, 0, array.length - 1)];
		}
		default: {
			if(integerIndex < 0 || integerIndex > array.length - 1){
				return endBehavior;
			}
			return array[integerIndex];
		}
	}
}
/**
 * 
 * @param {number[]} array 
 * @param {number} index
 * @param {"clamp" | "wrap" | "mirror" | "value" | number } endBehavior 
 */
export function sampleArray(array, index, endBehavior) {
	const base = Math.floor(index);
	const start = getIndexWithOob(array, base, endBehavior);
	const end = getIndexWithOob(array, base + 1, endBehavior);
	return lerp(start, end, getFractionalPart(index));
}