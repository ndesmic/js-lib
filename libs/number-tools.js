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

export function clamp(value, low, high){
	low = low !== undefined ? low : Number.MIN_SAFE_INTEGER;
	high = high !== undefined ? high : Number.MAX_SAFE_INTEGER;
	if(value < low){
		value = low;
	}
	if(value > high){
		value = high;
	}
	return value;
}