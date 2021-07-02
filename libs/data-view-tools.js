export function getString(dataView, offset, length) {
	let str = "";
	for (let i = 0; i < length; i++) {
		const code = dataView.getUint8(offset + i);
		str += String.fromCharCode(code);
	}
	return str;
}

export function getByteOrderedString(dataView, offset, length){
	const first = dataView.getUint8(offset);
	const second = dataView.getUint8(offset + 1);
	const third = dataView.getUint8(offset + 2);

	let encoding;
	let bomLength = 0;
	if(first === 0x01 && second === 0xFF && third === 0xFE){ //UTF-16 LE
		encoding = "utf-16le";
		bomLength = 2;
	} else if (first === 0x01 && second === 0xFF && third === 0xFE){
		encoding = "utf-16be";
		bomLength = 2;
	} else if (first === 0xEF && second === 0xBB && third === 0xBF){
		encoding = "utf-8";
		bomLength = 3;
	} else {
		encoding = "iso-8859-1";
	}
	const decoder = new TextDecoder(encoding);
	return decoder.decode(dataView.buffer.slice(offset + bomLength, offset + bomLength + length))
}