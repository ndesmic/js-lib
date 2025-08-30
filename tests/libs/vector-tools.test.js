import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { normalizeNumber } from "../../libs/number-tools.js";
import { dotVector, getAdjugate, getCofactor, getCofactorMatrix, getDeterminant, getDeterminantSubmatrix, getInverse, mapMatrix, multiplyMatrix, scaleMatrix, transpose, trimMatrix, asMatrix, addVector, subtractVector, scaleVector, divideVector, addMatrix, divideMatrix, multiplyMatrixVector  } from "../../libs/vector-tools.js";

describe("vector-tools", () => {
	describe(".addVector", () => {
		[
			{
				args: [
					[1, 2, 3, 4],
					[3, 3, 3, 3]
				],
				result: [4, 5, 6, 7]
			},
		].forEach(test => {
			it(`adds vectors ${JSON.stringify(test.args)}`, () => {
				const result = addVector(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".addMatrix", () => {
		[
			{
				args: [
					[
						[1, 2, 3], 
						[4, 5, 6],
						[7, 8, 9]
					],
					[
						[1, 2, 1],
						[3, 4, 3],
						[5, 6, 6]
					]
				],
				result: [
					[2, 4, 4],
					[7, 9, 9],
					[12, 14, 15]
				]
			},
		].forEach(test => {
			it(`adds matrices ${JSON.stringify(test.args)}`, () => {
				const result = addMatrix(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".subtractVector", () => {
		[
			{
				args: [
					[1, 2, 3, 4],
					[3, 3, 3, 3]
				],
				result: [-2, -1, 0, 1]
			},
		].forEach(test => {
			it(`subtracts vectors ${JSON.stringify(test.args)}`, () => {
				const result = subtractVector(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".scaleVector", () => {
		[
			{
				args: [
					[1, 2, 3, 4],
					2
				],
				result: [2, 4, 6, 8]
			},
		].forEach(test => {
			it(`multiplies vector by constant ${JSON.stringify(test.args)}`, () => {
				const result = scaleVector(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".divideVector", () => {
		[
			{
				args: [
					[1, 2, 3, 4],
					2
				],
				result: [0.5, 1, 1.5, 2]
			},
		].forEach(test => {
			it(`divides vector by constant ${JSON.stringify(test.args)}`, () => {
				const result = divideVector(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".dotVector", () => {
		[
			{
				args: [
					[1,2,3],
					[7,9,11]
				],
				result: 58
			},
		].forEach(test => {
			it(`gets dot product ${JSON.stringify(test.args)}`, () => {
				const result = dotVector(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".multiplyMatrix", () => {
		[
			{
				args: [
					[
						[1, 2, 3],
						[4, 5, 6]
					],
					[
						[7,8],
						[9,10],
						[11,12]
					]
				],
				result: [
					[58, 64],
					[139, 154]
				]
			},
		].forEach(test => {
			it(`gets dot product ${JSON.stringify(test.args)}`, () => {
				const result = multiplyMatrix(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".trimMatrix", () => {
		[
			{
				args: [
					[
						[1, 2, 3],
						[4, 5, 6],
						[7,8,9,10]
					],
					2,2
				],
				result: [
					[1, 2],
					[4, 5]
				]
			},
		].forEach(test => {
			it(`trims the matrix ${JSON.stringify(test.args)}`, () => {
				const result = trimMatrix(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".getDeterminantSubmatrix", () => {
		[
			{ 
				args: [
					[
						[1, 2, 3],
						[4, 5, 6],
						[7, 8, 9]
					],
					0, 0
				], 
				result: [
					[5,6],
					[8,9]
				]
			},
			{
				args: [
					[
						[1, 2, 3, 4],
						[5, 6, 7, 8],
						[9, 10, 11, 12],
						[13, 14, 15, 16]
					],
					1, 1
				],
				result: [
					[1, 3, 4],
					[9, 11, 12],
					[13, 15, 16]
				]
			}
		].forEach(test => {
			it(`gets determinant submatrix ${JSON.stringify(test.args)}`, () => {
				const result = getDeterminantSubmatrix(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".getDeterminant", () => {
		[
			{
				args: [
					[
						[1, 2],
						[3, 4]
					]
				],
				result: -2
			},
			{
				args: [
					[
						[12, 4, 5, 78],
						[23, 2, 4, 45],
						[34, 1, 56, 7],
						[2, 9, 12, 67]
					]
				],
				result: 347844
			}
		].forEach(test => {
			it(`gets determinant ${JSON.stringify(test.args)}`, () => {
				const result = getDeterminant(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".getCofactor", () => {
		[
			{
				args: [
					[
						[1, 2, 3, 4],
						[0, 5, 6, 7],
						[0, 8, 9, 10],
						[0, 0, 0, 11]
					],
					1, 2
				],
				result: -88
			}
		].forEach(test => {
			it(`gets cofactor ${JSON.stringify(test.args)}`, () => {
				const result = getCofactor(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".getCofactorMatrix", () => {
		[
			{
				args: [
					[
						[1, 2, 3],
						[0, 4, 5],
						[1, 0, 6],
					]
				],
				result: [
					[24, 5, -4],
					[-12, 3, 2],
					[-2, -5, 4]
				]
			}
		].forEach(test => {
			it(`gets cofactor matrix ${JSON.stringify(test.args)}`, () => {
				const result = getCofactorMatrix(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".transpose", () => {
		[
			{
				args: [
					[
						[1, 2, 3],
						[0, 4, 5],
						[1, 0, 6],
					]
				],
				result: [
					[1, 0, 1],
					[2, 4, 0],
					[3, 5, 6]
				]
			}
		].forEach(test => {
			it(`gets transpose of matrix ${JSON.stringify(test.args)}`, () => {
				const result = transpose(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".getAdjugate", () => {
		[
			{
				args: [
					[
						[1, 2, 3],
						[0, 4, 5],
						[1, 0, 6],
					]
				],
				result: [
					[24, -12, -2],
					[5, 3, -5],
					[-4, 2, 4]
				]
			}
		].forEach(test => {
			it(`gets adjugate of matrix ${JSON.stringify(test.args)}`, () => {
				const result = getAdjugate(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".scaleMatrix", () => {
		[
			{
				args: [
					[
						[1, 2, 3],
						[0, 4, 5],
						[1, 0, 6],
					],
					4
				],
				result: [
					[4, 8, 12],
					[0, 16, 20],
					[4, 0, 24]
				]
			}
		].forEach(test => {
			it(`scales matrix by constant ${JSON.stringify(test.args)}`, () => {
				const result = scaleMatrix(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".divideMatrix", () => {
		[
			{
				args: [
					[
						[1, 2, 3],
						[0, 4, 5],
						[1, 0, 6],
					],
					4
				],
				result: [
					[0.25, 0.5, 0.75],
					[0, 1, 1.25],
					[0.25, 0, 1.5]
				]
			}
		].forEach(test => {
			it(`divides matrix by constant ${JSON.stringify(test.args)}`, () => {
				const result = divideMatrix(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".getInverse", () => {
		[
			{
				args: [
					[
						[1, 2, 3, 4],
						[1, 3, 4, 2],
						[9, 4, 8, 5],
						[1, 3, 2, 4]
					]
				],
				result: [
					[-0.234, -0.180, 0.141, 0.148],
					[-0.641, 0.242, -0.016, 0.539],
					[0.359, 0.242, -0.016, -0.461],
					[0.359, -0.258, -0.016, 0.039]
				]
			}
		].forEach(test => {
			it(`gets inverse of matrix ${JSON.stringify(test.args)}`, () => {
				const result = getInverse(...test.args);
				const normalResult = mapMatrix(result, x => normalizeNumber(x, 3));
				expect(normalResult).toEqual(test.result);
			});
		});
	});
	describe(".asMatrix", () => {
		[
			{
				args: [
					[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
					4, 4
				],
				result: [
					[1,2,3,4],
					[5,6,7,8],
					[9,10,11,12],
					[13,14,15,16]
				]
			}
		].forEach(test => {
			it(`shapes array into matrix ${JSON.stringify(test.args)}`, () => {
				const result = asMatrix(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".multiplyMatrixVector", () => {
		[
			{ args: [[2,1,3], [[1,2,3],[4,5,6],[7,8,9]]], result: [13,31,49] },
		].forEach(test => {
			it(`multiplies vector by matrix ${JSON.stringify(test.args)}`, () => {
				const result = multiplyMatrixVector(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
});