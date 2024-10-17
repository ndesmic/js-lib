/**
 * Creates an array by starting at `start` and jumping `step` amount until `end`
 * @param {number} end
 * @param {{ step?: number, start?: number, includeEnd?: boolean }} options
 * @returns {number[]}
 */
export function getSteps(end, options = {}) {
	const step = options.step ?? 1;
	const start = options.start ?? 0;
	const includeEnd = options.includeEnd ?? true;
	const length = (includeEnd ? Math.ceil : Math.floor)((end - start) / step);
	const steps = new Array(length + 1);
	steps[0] = start;
	let current = start + step;
	let i = 1;
	while (current < end) {
		steps[i] = current;
		current += step;
		i += 1;
	}
	if(steps[i - 1] < end && includeEnd){
		steps[i] = end;
	}
	return steps;
}

/**
 * Creates an array given `steps` nodes between `start` and `end`.  Array with be length `steps`. Same as torch.linspace
 * @param {number} start
 * @param {number} end
 * @param {number} steps
 * @returns {number[]}
 */
export function getLinearSpace(start, end, steps){
	steps = steps - 1; //counting the spaces not the nodes
	const length = end - start;
	const partLength = length / steps;
	const array = new Array(steps);
	let current = start;
	for(let i = 0; i <= steps; i++){
		array[i] = current;
		current += partLength
	}
	return array;
}

export function getClosest(value, possibleValues){
	let highIndex = possibleValues.length;
	let lowIndex = 0;
	let midIndex;

	while(lowIndex < highIndex){
		midIndex = Math.floor((highIndex + lowIndex) / 2);
		if(value === possibleValues[midIndex]) return possibleValues[midIndex];
		if(value < possibleValues[midIndex]){
			if(midIndex > 0 && value > possibleValues[midIndex - 1]){
				return value - possibleValues[midIndex + 1] >= possibleValues[midIndex] - value
					? possibleValues[midIndex]
					: possibleValues[midIndex - 1] 
			}
			highIndex = midIndex;
		}
		else {
			if(midIndex < highIndex - 1 && value < possibleValues[midIndex + 1]){
				return value - possibleValues[midIndex] >= possibleValues[midIndex + 1] - value
					? possibleValues[midIndex + 1]
					: possibleValues[midIndex]
			}
			lowIndex = midIndex + 1;
		}
	}
	return possibleValues[midIndex]
}

export function lerp(start, end, normalValue) {
	return start + (end - start) * normalValue;
}

export function inverseLerp(start, end, value){
	return (value - start) / (end - start);
}

export function leftShiftBase10(value, places){
	return value * (10 ** places);
} 

export function rightShiftBase10(value, places){
	return value / (10 ** places);
}

export function floorAtPosition(value, position){
	return leftShiftBase10(Math.floor(rightShiftBase10(value, position)), position);
}