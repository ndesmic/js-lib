import { degreesToRadians, getPolygonArea, getPolygonCentroid2d, getPolygonCentroid3d, radiansToDegrees, triangleCentroid, triangleNormal } from "../libs/geometry-tools.js";
import { precision } from "../libs/number-tools.js";

describe("geometry-tools", () => {
	describe(".degreesToRadians", () => {
		[
			{ args: [0], result: 0 },
			{ args: [45], result: Math.PI / 4 },
			{ args: [90], result: Math.PI / 2 },
			{ args: [180], result: Math.PI },
			{ args: [270], result: 3 * Math.PI / 2 },
			{ args: [360], result: 2 * Math.PI }
		].forEach(test => {
			it(`coverts to radians ${JSON.stringify(test.args)}`, () => {
				const result = degreesToRadians(...test.args);
				expect(result).toBe(test.result);
			});
		});
	});
	describe(".radiansToDegrees", () => {
		[
			{ args: [0], result: 0 },
			{ args: [Math.PI / 4], result: 45 },
			{ args: [Math.PI / 2], result: 90 },
			{ args: [Math.PI], result: 180 },
			{ args: [3 * Math.PI / 2], result: 270 },
			{ args: [2 * Math.PI], result: 360 }
		].forEach(test => {
			it(`coverts to radians ${JSON.stringify(test.args)}`, () => {
				const result = radiansToDegrees(...test.args);
				expect(result).toBe(test.result);
			});
		});
	});
	describe(".triangleNormal", () => {
		[
			{ args: [
				[0, 0, 0],
				[0, 1, 0],
				[1, 0, 0],
			], result: [0, 0, 1] },
			{ args: [
				[0, -1, 0],
				[1, 0, 0],
				[0, 0, -1],
			], result: [0.58, -0.58, -0.58] }
		].forEach(test => {
			it(`gets triangle normal for ${JSON.stringify(test.args)}`, () => {
				const result = triangleNormal(...test.args).map(x => precision(x, 2));
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".triangleCentroid", () => {
		[
			{
				args: [
					[-0.5, -0.5, 0],
					[0.5, 0.5, 0],
					[-0.5, 0.5, 0]
				], result: [-0.17, 0.17, 0]
			}
		].forEach(test => {
			it(`gets triangle centroid for ${JSON.stringify(test.args)}`, () => {
				const result = triangleCentroid(...test.args).map(x => precision(x, 2));
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".getPolygonArea", () => {
		[
			{
				args: [
					[
						[2, 1],
						[4, 5],
						[7, 8]
					]
				], result: 3
			},
			{
				args: [
					[
						[3, 4],
						[5, 11],
						[12, 8],
						[9, 5],
						[5, 6]
					]
				], result: 30
			}
		].forEach(test => {
			it(`gets polygon area for ${JSON.stringify(test.args)}`, () => {
				const result = getPolygonArea(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".getPolygonCentroid2d", () => {
		[
			{
				args: [
					[
						[-0.5, -0.5],
						[0.5, 0.5],
						[-0.5, 0.5]
					]
				], result: [-0.17, 0.17]
			}
		].forEach(test => {
			it(`gets polygon centroid for ${JSON.stringify(test.args)}`, () => {
				const result = getPolygonCentroid2d(...test.args).map(x => precision(x, 2));
				expect(result).toEqual(test.result);
			});
		});
	});
	describe(".getPolygonCentroid3d", () => {
		[
			{
				args: [
					[
						[-0.5, -0.5, 0],
						[0.5, 0.5, 0],
						[-0.5, 0.5, 0]
					]
				], result: [-0.17, 0.17, 0]
			},
			{
				args: [
					[
						[0.5, -0.5, 0],
						[1.5, 0.5, 0],
						[0.5, 0.5, 0]
					]
				], result: [0.83, 0.17, 0]
			},
			{
				args: [
					[
						[-0.5, -0.5, -0.5],
						[0.5, 0.5, -0.5],
						[0.5, 0.5, 0.5],
						[-0.5, -0.5, 0.5]
					]
				], result: [0, 0, 0]
			}
		].forEach(test => {
			it(`gets polygon centroid for ${JSON.stringify(test.args)}`, () => {
				const result = getPolygonCentroid3d(...test.args).map(x => precision(x, 2));
				expect(result).toEqual(test.result);
			});
		});
	});
});