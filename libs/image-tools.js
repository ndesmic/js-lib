import { clamp, wrap, mirrorWrap } from "./number-tools.js"

export function readOob(value, min, max, behavior){
	switch(behavior){
		case "clamp": return clamp(value, min, max);
		case "wrap": return wrap(value, min, max);
		case "mirror": return mirrorWrap(value, min, max);
		default: (value < min || value > max) ? behavior : value;
	}
}

export function sample(imageData, row, col, oobBehavior) {
	const sampleCol = readOob(col, 0, imageData.width, oobBehavior.x);
	const sampleRow = readOob(row, 0, imageData.height, oobBehavior.y);

	const offset = (sampleRow * imageData.width * 4) + (sampleCol * 4);
	return [
		imageData.data[offset + 0] / 255,
		imageData.data[offset + 1] / 255,
		imageData.data[offset + 2] / 255,
		imageData.data[offset + 3] / 255
	]
}

export function setPx(imageData, col, row, val) {
	col = clamp(col, 0, imageData.width);
	row = clamp(row, 0, imageData.height);
	const offset = (row * imageData.width * 4) + (col * 4);
	return [
		imageData.data[offset + 0] = val[0] * 255,
		imageData.data[offset + 1] = val[1] * 255,
		imageData.data[offset + 2] = val[2] * 255,
		imageData.data[offset + 3] = val[3] * 255
	]
}

export function convolute(imageData, kernel, oobBehavior = { x: "clamp", y: "clamp" }) {
	const output = new ImageData(imageData.width, imageData.height);
	const kRowMid = (kernel.length - 1) / 2; //kernels should have odd dimensions
	const kColMid = (kernel[0].length - 1) / 2;

	for (let row = 0; row < imageData.height; row++) {
		for (let col = 0; col < imageData.width; col++) {

			const sum = [0, 0, 0];
			for (let kRow = 0; kRow < kernel.length; kRow++) {
				for (let kCol = 0; kCol < kernel[kRow].length; kCol++) {
					const color = sample(imageData, row + (-kRowMid + kRow), col + (-kColMid + kCol), oobBehavior);
					sum[0] += color[0] * kernel[kRow][kCol];
					sum[1] += color[1] * kernel[kRow][kCol];
					sum[2] += color[2] * kernel[kRow][kCol];
				}
			}

			setPx(output, col, row, [...sum, 1.0]);
		}
	}

	return output;
}