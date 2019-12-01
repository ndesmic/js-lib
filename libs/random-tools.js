export function getInt(exclusiveCap){
	return Math.floor(Math.random() * exclusiveCap);
}

export function getBool(){
	return getInt(2) === 0;
}

export function getOption(optionList){
	const index = getInt(optionList.length);
	return optionList[index];
}

const  sliceHex = (arr, start, end) =>
	Array.from(arr).slice(start, end).map(x => x.toString(16).toUpperCase().padStart(2, "0")).join("");

export function getGuid(){
	const arr = new Uint8Array(16);
	crypto.getRandomValues(arr);
	return `${sliceHex(arr,0,4)}-${sliceHex(arr,4,6)}-${sliceHex(arr,6,8)}-${sliceHex(arr,8,10)}-${sliceHex(arr,10,16)}`;
}

export function getNormal(mu = 0, sigma = 1, samples = 6){
	let total = 0;
	for(let i = 0; i < samples; i++){
		total += Math.random();
	}
	return sigma * (total - samples / 2) / (samples / 2) + mu;
}