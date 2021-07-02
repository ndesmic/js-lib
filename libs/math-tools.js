export function getSteps(step, end, start = 0) {
	const steps = [start];
	let current = start + step;
	while (current < end) {
		steps.push(current);
		current += step;
	}
	steps.push(end);
	return steps;
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