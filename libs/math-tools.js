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