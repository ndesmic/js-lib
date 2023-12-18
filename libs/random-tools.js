export function getUniform(max = 1, min = 0){
	return min + Math.random() * (max - min);
}

//Box Muller
export function getNormal(mean = 0, standardDeviation = 1) {
	const u1 = Math.random();
	const u2 = Math.random();
	return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * standardDeviation + mean;
}

export function getInt(max = 1, min = 0){
	return Math.floor(getUniform(max, min));
}

export function getBool(){
	return getInt(2) === 0;
}

export function getOption(optionList){
	const index = getInt(optionList.length);
	return optionList[index];
}

const sliceHex = (arr, start, end) =>
	Array.from(arr).slice(start, end).map(x => x.toString(16).toUpperCase().padStart(2, "0")).join("");


export function getGuid(){
	const arr = new Uint8Array(16);
	crypto.getRandomValues(arr);
	return `${sliceHex(arr,0,4)}-${sliceHex(arr,4,6)}-${sliceHex(arr,6,8)}-${sliceHex(arr,8,10)}-${sliceHex(arr,10,16)}`;
}