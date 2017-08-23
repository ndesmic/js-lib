export function dot(lhs, rhs){
	const sharedLength = lhs[0].length;
	if(sharedLength != rhs.length){
		throw `Shared lengths do not match. Found ${majorLength} and ${y.length}`;
	}

	const width = rhs[0].length;
	const height = lhs.length;
	const result = new Array(height)

	for(let i = 0; i < height; i++){
		result[i] = new Array(width).fill(0);
	}

	for(let i = 0; i < height; i++){
		for(let j = 0; j < width; j++){
			for(let k = 0; k < lhs[i].length; k++){
				result[i][j] += lhs[i][k] * rhs[k][j];
			}
		}
	}

	return result;
}
