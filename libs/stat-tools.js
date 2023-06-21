//Tools for statistics
export function sum(values){
	return values.reduce((sum, v) => sum + v);
}
export function min(values){
	return values.reduce((min, v) => Math.min(min, v));
}
export function max(values) {
	return values.reduce((max, v) => Math.max(max, v));
}
export function average(values){
	return sum(values) / values.length;
}
export function standardDeviation(values){
	const avg = average(values);
	return average(values.map(v => (v - avg)**2))
}