export const UP = [0, 1, 0];
export const FORWARD = [0, 0, 1];
export const RIGHT = [1, 0, 0];

export function transpose(matrix) {
	const result = [];
	for(let row = 0; row < matrix.length; row++){
		const newRow = [];
		for(let col = 0; col < matrix[row].length; col++){
			newRow.push(matrix[col][row]);
		}
		result.push(newRow);
	}
	return result;
}

export function getVectorMagnitude(vec) {
	return Math.sqrt(vec.reduce((sum, x) => sum + x ** 2, 0));
}


export function addVector(a, b) {
	return a.map((x, i) => x + b[i]);
}

export function subtractVector(a, b) {
	return a.map((x, i) => x - b[i]);
}

export function scaleVector(vec, s) {
	return vec.map(x => x * s);
}

export function divideVector(vec, s) {
	return vec.map(x => x / s);
}

export function normalizeVector(vec) {
	return divideVector(vec, getVectorMagnitude(vec));
}

//3x3
export function crossVector(a, b) {
	return [
		a[1] * b[2] - a[2] * b[1],
		a[2] * b[0] - a[0] * b[2],
		a[0] * b[1] - a[1] * b[0]
	];
}

//vectors must have same length!
export function dotVector(a, b) {
	return a.reduce((sum, _, i) => sum + (a[i] * b[i]), 0);
}

export function invertVector(vec) {
	return vec.map(x => -x);
}

export function reflectVector(vec, normal) {
	return [
		vec[0] - 2 * dotVector(vec, normal) * normal[0],
		vec[1] - 2 * dotVector(vec, normal) * normal[1],
		vec[2] - 2 * dotVector(vec, normal) * normal[2],
	];
}

export function getDeterminantSubmatrix(matrix, row, col){
	const result = [];
	for(let i = 0; i < matrix.length; i++){
		const newRow = [];
		if(i === row) continue;
		for(let j = 0; j < matrix[i].length; j++){
			if(j === col) continue;
			newRow.push(matrix[i][j]);
		}
		result.push(newRow);
	}
	return result;
}

export function getDeterminant(matrix){
	let result = 0;

	if (matrix.length === 2 && matrix[0].length === 2) return (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);

	for(let i = 0; i < matrix[0].length; i++){
		if(i % 2 === 0){
			result += matrix[0][i] * getDeterminant(getDeterminantSubmatrix(matrix, 0, i));
		} else {
			result -= matrix[0][i] * getDeterminant(getDeterminantSubmatrix(matrix, 0, i));
		}
	}

	return result;
}

export function getCofactor(matrix, row, col){
	const determinant = getDeterminant(getDeterminantSubmatrix(matrix, row, col));
	return (row + col) % 2 === 1
		? -determinant
		: determinant;
}

export function getCofactorMatrix(matrix){
	const result = [];
	for(let row = 0; row < matrix.length; row++){
		const newRow = [];
		for (let col = 0; col < matrix[row].length; col++) {
			newRow.push(getCofactor(matrix, row, col));
		}
		result.push(newRow);
	}
	return result;
}

export function getAdjugate(matrix){
	return transpose(getCofactorMatrix(matrix));
}

export function getInverse(matrix){
	return scaleMatrix(getAdjugate(matrix), 1 / getDeterminant(matrix));
}

export function mapMatrix(matrix, func){
	const result = [];
	for (let row = 0; row < matrix.length; row++) {
		const newRow = [];
		for (let col = 0; col < matrix[row].length; col++) {
			newRow.push(func(matrix[row][col], row, col));
		}
		result.push(newRow);
	}
	return result;
}

export function addMatrix(a, b){
	return mapMatrix(a, (x, r, c) => x + b[r][c]);
}

export function subtractMatrix(a, b) {
	return mapMatrix(a, (x, r, c) => x - b[r][c]);
}

export function scaleMatrix(matrix, s) {
	return mapMatrix(matrix, (x, r, c) => x * s);
}

export function divideMatrix(matrix, s) {
	return mapMatrix(matrix, (x, r, c) => x / s);
}


export function trimMatrix(matrix, height, width) {
	const result = [];
	for (let row = 0; row < height; row++) {
		const newRow = [];
		for (let col = 0; col < width; col++) {
			newRow.push(matrix[row][col]);
		}
		result.push(newRow);
	}
	return result;
}

export function getColumn(matrix, col){
	const result = [];
	for(let row = 0; row < matrix.length; row++){
		result.push(matrix[row][col]);
	}
	return result;
}

//A's rows must equal B's columns, no check is given
export function multiplyMatrix(a, b) {
	const result = [];
	for (let row = 0; row < a.length; row++) {
		const newRow = [];
		for (let col = 0; col < b[row].length; col++) {
			newRow.push(dotVector(a[row], getColumn(b, col)));
		}
		result.push(newRow);
	}

	return result;
}

export function asMatrix(array, height, width) {
	const result = [];
	for (let row = 0; row < height; row++) {
		const newRow = [];
		for (let col = 0; col < width; col++) {
			newRow.push(array[row * width + col]);
		}
		result.push(newRow);
	}
	return result;
}