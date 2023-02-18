export function precision(value, significantDigit){
	const multiplier = Math.pow(10, significantDigit);
	return Math.round(value * multiplier) / multiplier;
}
export const round = (value, radix) =>
	Math.round(value / radix) * radix;

export const isNumber = value =>
	!isNaN(value-0) && value !== null && value !== "" && value !== false;

export const parseIntOrDefault = (value, defaultValue) =>
	isNaN(parseInt(value)) ? (defaultValue || null) : value;

export function clamp(value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER){
	return Math.max(Math.min(value, max), min);
}

export function wrap(value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER){
	const range = max - min;
	return value < min
		? max - Math.abs(min - value) % range
		: min + (value + range) % range;
}

export function mirrorWrap(value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER){
	const range = max - min;
	const minDistance = Math.abs(min - value);
	const intervalValue = minDistance % range;
	if (value % (max + max) > max) return max - intervalValue //too high (mirrored)
	if (value >= max) return min + intervalValue; //to high (unmirrored)
	if (value < min && minDistance % (range + range) > range) return max - intervalValue; //too low (mirrored)
	if (value <= min) return min + intervalValue; //to low (mirrored)
	return value;
}

export function toBinary(n) {
	if(n === 0) return [0];
	function bin(n) {
		if (n > 1) {
			return [n % 2, ...bin(Math.floor(n / 2))];
		}
		return [1];
	}
	return bin(n).reverse();
}

export function normalizeNumber(num, len) {
	num = parseFloat(num.toFixed(len));
	num = num === -0 ? 0 : num;
	return num;
}