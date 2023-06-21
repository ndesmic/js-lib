export function stringToTextStream(value){
	return new ReadableStream({
		start(controller){
			controller.enqueue(value);
			controller.close();
		}
	});
}

export function stringToBinaryStream(value){
	return stringToTextStream(value).pipeThrough(new TextEncoderStream());
}

export async function textStreamToString(stream){
	const reader = stream.getReader();
	let text = "";
	let done = false;

	while(!done){
		const result = await reader.read();
		done = result.done;
		if(result.value){
			text += result.value;
		}
	}
	
	return text;
}

export async function binaryStreamToString(stream){
	return await textStreamToString(stream.pipeThrough(new TextDecoderStream()));
}

export function objectToBinaryJsonStream(value){
	return stringToBinaryStream(JSON.stringify(value));
}

export async function binaryJsonStreamToObject(stream){
	return JSON.parse(binaryStreamToString(stream));
}

export async function binaryStreamToArrayBuffer(stream){
	const reader = stream.getReader();
	const chunks = [];
	let done = false;

	while (!done) {
		const result = await reader.read();
		done = result.done;
		if (result.value) {
			chunks.push(result.value);
		}
	}

	const totalByteLength = chunks.map(b => b.byteLength).reduce((sum, val) => sum + val);

	const buffer = new Uint8Array(totalByteLength);

	let i = 0;
	for(const chunk of chunks){
		buffer.set(chunk, i);
		i += chunk.byteLength;
	}

	return buffer.buffer;
}