import { degreesToRadians, getIntersectionArea, getPolygonArea, getPolygonCentroid2d, getPolygonCentroid3d, radiansToDegrees, triangleCentroid, triangleNormal } from "../libs/geometry-tools.js";
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

	describe(".getIntersectionArea", () => {
		[
			{
				args: [
					{ top: 0, left: 0, width: 100, height: 100 },
					{ top: 50, left: 50, width: 100, height: 100 }
				], 
				result: 2500
			},
			{
				args: [
					{ top: 50, left: 50, width: 100, height: 100 },
					{ top: 0, left: 0, width: 100, height: 100 }
				],
				result: 2500
			},
			{
				args: [
					{ top: 50, left: 50, width: 50, height: 50 },
					{ top: 0, left: 0, width: 50, height: 50 }
				],
				result: 0
			},
			{
				args: [
					{ top: 50, left: 50, width: 50, height: 50 },
					{ top: 50, left: 75, width: 50, height: 50 }
				],
				result: 1250
			},
			{
				args: [
					{ top: 25, left: 50, width: 50, height: 50 },
					{ top: 50, left: 50, width: 50, height: 50 }
				],
				result: 1250
			}
		].forEach(test => {
			it(`gets intersection area for ${JSON.stringify(test.args)}`, () => {
				const result = getIntersectionArea(...test.args);
				expect(result).toEqual(test.result);
			});
		});
	});
});