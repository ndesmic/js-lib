export function getFlatIndex(colMajorIndices, colMajorShape) {
	if (colMajorIndices.length != colMajorShape.length) throw new Error(`Indices count must match shape. indices length was ${colMajorIndices.length}, shape has length ${colMajorShape.length}.`);

	const rowMajorShape = colMajorShape.toReversed();
	const rowMajorIndices = colMajorIndices.toReversed();

	let index = 0;
	for (let i = 0; i < rowMajorShape.length; i++) {
		index *= rowMajorShape[i];
		index += rowMajorIndices[i];
	}

	return index;
}
export function getDimensionalIndices(flatIndex, colMajorShape) {
	const indices = [];
	for (const size of colMajorShape) {
		indices.push(flatIndex % size);
		flatIndex = Math.floor(flatIndex / size);
	}
	return indices;
}
export function sum(input, shape, dim) {
	const newShape = shape.filter((_, i) => i !== dim);
	const outputLength = newShape.reduce((prod, x) => prod * x, 1);
	const output = new Array(outputLength).fill(0);

	for (let i = 0; i < output.length; i++) {
		const newIndices = getDimensionalIndices(i, newShape);
		for (let j = 0; j < shape[dim]; j++) {
			const oldIndices = newIndices.toSpliced(dim, 0, j);
			const oldFlatIndex = getFlatIndex(oldIndices, shape);

			output[i] += input[oldFlatIndex]
		}
	}
	return [output, newShape];
}