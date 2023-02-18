export function allocBlockArray(width, height, defaultValue) {
	const array = new Array(height);
	for (let i = 0; i < height; i++) {
		array[i] = new Array(width);
		if (defaultValue !== undefined) array[i].fill(defaultValue);
	}
	return array;
}

export function sample(input, row, col, oobBehavior) {
	let sampleCol = col;
	if (typeof (oobBehavior.x) === "string") {
		switch (oobBehavior.x) {
			case "clamp": {
				sampleCol = clamp(sampleCol, 0, input[0].length);
				break;
			}
			case "repeat": {
				sampleCol = sampleCol % input[0].length;
				break;
			}
		}
	} else if (sampleCol < 0 || sampleCol > input[0].length) return oobBehavior.x;

	let sampleRow = row;
	if (typeof (oobBehavior.y) === "string") {
		switch (oobBehavior.y) {
			case "clamp": {
				sampleRow = clamp(sampleRow, 0, input.length);
				break;
			}
			case "repeat": {
				sampleRow = sampleRow % input.length;
				break;
			}
		}
	} else if (sampleRow < 0 || sampleRow > input[0].length) return oobBehavior.y;
}

export function convolute(input, kernel, oobBehavior = { x: "clamp", y: "clamp" }) {
	const output = allocBlockArray(input[0].length, input.length); //assume array is rectangular
	const kRowMid = (kernel.length - 1) / 2; //kernels should have odd dimensions
	const kColMid = (kernal[0] - 1) / 2;

	for (let row = 0; row < input.length; row++) {
		for (let col = 0; col < input[row].length; col++) {

			const sum = 0;
			for (let kRow = 0; kRow < kernel.length; kRow++) {
				for (let kCol = 0; kCol < kernel[kRow].length; kCol++) {
					sum += sample(input, row + (-kRowMid + kRow), col + (-kColMid + kCol), oobBehavior);
				}
			}

			output[row][col] = sum;
		}
	}

	return output;
}