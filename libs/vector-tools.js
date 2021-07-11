export function getVectorMagnitude(vec) {
	let sum = 0;
	for (const el of vec) {
		sum += el ** 2;
	}
	return Math.sqrt(sum);
}

export function addVector(a, b) {
	return [
		a[0] + b[0],
		a[1] + b[1],
		a[2] + b[2]
	];
}

export function subtractVector(a, b) {
	return [
		a[0] - b[0],
		a[1] - b[1],
		a[2] - b[2]
	];
}

export function multiplyVector(vec, s) {
	return [
		vec[0] * s,
		vec[1] * s,
		vec[2] * s
	];
}

export function divideVector(vec, s) {
	return [
		vec[0] / s,
		vec[1] / s,
		vec[2] / s
	];
}

export function normalizeVector(vec) {
	return divideVector(vec, getVectorMagnitude(vec));
}

export function crossVector(a, b) {
	return [
		a[1] * b[2] - a[2] * b[1],
		a[2] * b[0] - a[0] * b[2],
		a[0] * b[1] - a[1] * b[0]
	];
}

export function dotVector(a, b) {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

export function invertVector(vec) {
	return vec.map(x => -x);
}