export function arrayBufferToHex(arrayBuffer, options){
	var dataView = new DataView(arrayBuffer);
	options = options || {};
	var from = options.from || 0;
	var to = options.to || dataView.byteLength; //not inclusive
	var splitLength = options.splitLength || 0;
	if(to && options.length){
		to = from + options.length;
	}
	var hex = "";
	for(var i = from; i < to; i++){
		var newHex = dataView.getUint8(i).toString(16);
		hex += pad(newHex, 2);
		if(splitLength && ((i + 1) % splitLength) == 0 && i != dataView.byteLength - 1){
			hex += ", ";
		}
	}
	return hex;
}
export function arrayBufferToBinary(arrayBuffer, splitLength){
	var dataView = new DataView(arrayBuffer);
	var bin = "";
	for(var i = 0; i < dataView.byteLength; i++){
		var newBin = dataView.getUint8(i).toString(2);
		bin += pad(newBin, 8) + " ";
		if(splitLength && ((i + 1) % splitLength) == 0 && i != dataView.byteLength - 1){
			bin += ", ";
		}
	}
	return bin.trim();
}

/**
 * Converts arraybuffer to base64 string (eg. for data url)
 * @param {ArrayBuffer} arrayBuffer 
 * @param {number} start
 * @param {number} length 
 * @returns {string}
 */
export function arrayBufferToBase64(arrayBuffer, start, length){
	const uint8Array = new Uint8Array(arrayBuffer, start, length);
	return window.btoa(String.fromCharCode(...uint8Array));
}
//can use padLeft
export function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
export function byteArrayToArrayBuffer(array){
	var arrayBuffer = new ArrayBuffer(array.length);
	var uInt8Array = new Uint8Array(arrayBuffer);
	for(var i = 0; i < array.length; i++){
		uInt8Array[i] = array[i];
	}
	return arrayBuffer;
}
export function byteArrayToString(array){
	var str = "";
	for(var i = 0; i < array.length; i++){
		str += String.fromCharCode(array[i]);
	}
	return str;
}
export function byteArrayToVisualString(array){
  var str = "";
	for(var i = 0; i < array.length; i++){
	  if(array[i] > 32){
		  str += String.fromCharCode(array[i]);
	  }else{
	    str += `[${array[i]}]`;
	  }
	}
	return str;
}
export function byteArrayToHexString(array){
	var str = "";
	for(var i = 0; i < array.length; i++){
  		str += "0x" + array[i].toString(16) + ", ";
	}
	return str;
}
export function byteArrayToBinary(byteArray, splitLength){
	var bin = "";
	for(var i = 0; i < byteArray.length; i++){
		var newBin = byteArray[i].toString(2);
		bin += pad(newBin, 8) + " ";
		if(splitLength && ((i + 1) % splitLength) === 0 && i != byteArray - 1){
			bin += ", ";
		}
	}
	return bin.trim();
}
export function dataURItoBlob(dataURI) {
	var uriSplit = dataURI.split(',');
	var byteString = atob(uriSplit[1]);
	var mimeString = uriSplit[0].split(':')[1].split(';')[0];
	var arrayBuffer = new ArrayBuffer(byteString.length);
	var uInt8Array = new Uint8Array(arrayBuffer);
	for (var i = 0; i < byteString.length; i++) {
		uInt8Array[i] = byteString.charCodeAt(i);
	}
	var blob = new Blob([uInt8Array], { "type" : mimeString });
	return blob;
}
export function dataURItoArrayBuffer(dataURI) {
	var uriSplit = dataURI.split(',');
	var byteString = atob(uriSplit[1]);
	var mimeString = uriSplit[0].split(':')[1].split(';')[0];
	var arrayBuffer = new ArrayBuffer(byteString.length);
	var uInt8Array = new Uint8Array(arrayBuffer);
	for (var i = 0; i < byteString.length; i++) {
		uInt8Array[i] = byteString.charCodeAt(i);
	}
	return arrayBuffer;
}
export function dataURItoUint8Array(dataURI) {
	var arrayBuffer = dataURItoArrayBuffer(dataURI);
	return new Uint8Array(arrayBuffer);
}
export function dataViewToByteArray(dataView, start, length){
	start = start || 0;
	length = length || dataView.byteLength - start;
	var array = [];
	for(var i = start; i < start + length; i++){
		array.push(dataView.getUint8(i))
	}
	return array;
}
export function dataViewToString(dataView, start, length){
	start = start || 0;
	length = length || dataView.byteLength - start;
	var newString = "";
	for(var i = start; i < start + length; i++){
		newString += String.fromCharCode(dataView.getUint8(i));
	}
	return newString;
}
export function stringToArrayBuffer(string){
	var arrayBuffer = new ArrayBuffer(string.length);
	var uInt8Array = new Uint8Array(arrayBuffer);
	for (var i = 0; i < string.length; i++) {
		uInt8Array[i] = string.charCodeAt(i);
	}
	return arrayBuffer;
}
export function stringToByteArray(string){
	var array = [];
	for(var i = 0; i < string.length; i++){
		array.push(string.charCodeAt(i));
	}
	return array;
}
export function stringToDataUri(newString, options){
	options = options || {};
	var mimeType = options.mimeType || "text/plain";
	var base64 = options.base64 || false;
	var charEncoding = options.charEncoding || "utf8";
	var uri = "data:" + mimeType + ";utf8";
	if(base64){
		uri += ";Base64," + atob(newString);
	}else{
		uri += "," + newString;
	}
	return uri;
}
export function stringToBlob(text, mimeType){
	return new Blob([text], { type : mimeType })
}
export function stringToObjectUrl(text, mimeType){
	return URL.createObjectURL(new Blob([text], { type : mimeType }));
}
export function concatUint8Arrays(a, b) {
	const c = new Uint8Array(a.length + b.length);
	c.set(a, 0);
	c.set(b, a.length);
	return c;
}
export function byteToDec(bin) {
	let result = 0;
	for (let i = 0; i < bin.length; i++) {
		result = result | bin[i] << (7 - i);
	}
	return result;
}
