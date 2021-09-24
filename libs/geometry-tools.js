import { subtractVector, normalizeVector, crossVector, dotVector } from "./vector-tools.js";

export const TWO_PI = Math.PI * 2;
export const HALF_PI = Math.PI / 2;
export const THREE_HALFS_PI = (3 * Math.PI) / 2;

export function getRayDirection(rayAngle){
	let xfactor = 0;
	let yfactor = 0;
	rayAngle = normalizeAngle(rayAngle);
	if (rayAngle >= 0 && rayAngle < HALF_PI) {
		xfactor = 1;
		yfactor = 1;
	} else if (rayAngle >= HALF_PI && rayAngle < Math.PI) {
		xfactor = -1;
		yfactor = 1;
	} else if (rayAngle >= Math.PI && rayAngle < THREE_HALFS_PI){
		xfactor = -1;
		yfactor = -1;
	} else if (rayAngle >= THREE_HALFS_PI && rayAngle < TWO_PI){
		xfactor = 1;
		yfactor = -1;
	} else {
		console.error(`Error: Invalid ray angle = ${rayAngle}`);
	}
	return { x : xfactor, y : yfactor };
}

export function normalizeAngle(angle){
	if(angle < 0){
		return TWO_PI - (Math.abs(angle) % TWO_PI);
	}
	return angle % TWO_PI;
}

export function getDistanceFromOrigin(...dimensions){
	return Math.sqrt(dimensions.map(x => x*x).reduce((previous, current) => current + previous, 0));
}
	
//gets magnitude of a vector (distance without sqrt)
export function getMagnitude(vector){
	let magnitude = (vector.x ** 2) + (vector.y ** 2);
	if(vector.z !== undefined){
		magnitude += (vector.z ** 2);
	}
	return magnitude;
}

//gets the distance between two points
export function pointDistance(pointA, pointB){
	return Math.sqrt(pointMagnitudeDifference(pointA, pointB));
}

//a comparator for sorting by magnitude
export function magnitudeCompare(pointA, pointB){
	return getMagnitude(pointA) - getMagnitude(pointB);
}

//vector subtract
export function pointDifference(pointA, pointB){
	let difference = {
		x : pointA.x - pointB.x,
		y : pointA.y - pointB.y
	};
	if(pointA.z !== undefined && pointB.z !== undefined){
		difference.z = pointA.z - pointB.z;
	}
	return difference;
}

//gets the magnitude of difference between points
export function pointMagnitudeDifference(pointA, pointB){
	return getMagnitude(pointDifference(pointA, pointB));
}

export function pointToGrid(x, y, scale){
	const gy = Math.floor(y / scale);
	const gx = Math.floor(x / scale);
	return { x : gx, y : gy };
}
	
export function degreesToRadians(deg){
	return deg * (Math.PI/180);
}

export function radiansToDegrees(rad){
	return rad * (180/Math.PI);
}

export function polarToCartesian(r, theta, cx = 0, cy = 0){
	return [r * Math.cos(theta) + cx, r * Math.sin(theta) + cy];
}

export function cartesianToPolar(x, y, cx = 0, cy = 0) {
	return [Math.sqrt((x - cx) ** 2 + (y - cy) ** 2), Math.atan2((y - cy), (x - cx))];
}

export function center(vlength, vmin, vmax) {
	const center = (vmax - vmin) / 2;
	return center - (vlength / 2);
}

//4-dimensions
export function lerp(pointA, pointB, normalValue) {
	return [
		pointA[0] + (pointB[0] - pointA[0]) * normalValue,
		pointA[1] + (pointB[1] - pointA[1]) * normalValue,
		pointA[2] + (pointB[2] - pointA[2]) * normalValue,
		pointA[3] + (pointB[3] - pointA[3]) * normalValue,
	];
}

export function inverseLerp(v, vmin, vmax) {
	return (v - vmin) / (vmax - vmin);
}

//order matters! CCW from bottom to top
export function triangleNormal(pointA, pointB, pointC) {
	const vector1 = subtractVector(pointC, pointA);
	const vector2 = subtractVector(pointB, pointA);
	return normalizeVector(crossVector(vector1, vector2));
}

export function triangleCentroid(pointA, pointB, pointC) {
	return [
		(pointA[0] + pointB[0] + pointC[0]) / 3,
		(pointA[1] + pointB[1] + pointC[1]) / 3,
		(pointA[2] + pointB[2] + pointC[2]) / 3,
	];
}

export function getPolygonArea(points) {
	let sum = 0;
	for (let i = 0; i < points.length; i++) {
		const nextI = (i + 1) % points.length;
		sum += (points[i][0] * points[nextI][1]) - (points[nextI][0] * points[i][1]);
	}
	return Math.abs(sum) / 2;
}

export function getPolygonCentroid2d(points) {
	const area = getPolygonArea(points);

	let sumX = 0;
	let sumY = 0;
	for (let i = 0; i < points.length; i++) {
		const nextI = (i + 1) % points.length;
		const x0 = points[i][0];
		const x1 = points[nextI][0];
		const y0 = points[i][1];
		const y1 = points[nextI][1];

		const doubleArea = (x0 * y1) - (x1 * y0);
		sumX += (x0 + x1) * doubleArea;
		sumY += (y0 + y1) * doubleArea;
	}

	const cx = sumX / (6 * area);
	const cy = sumY / (6 * area);

	return [cx, cy];
}

export function getPolygonCentroid3d(points) {
	const n = triangleNormal(points[0], points[1], points[2]);
	const u = normalizeVector(subtractVector(points[1], points[2]));
	const v = normalizeVector(crossVector(u, n));
	const p0 = points[0];

	const mappedPoints = points.map(p => [dotVector(subtractVector(p, p0), u), dotVector(subtractVector(p, p0), v)]);
	const [cu, cv] = getPolygonCentroid2d(mappedPoints);

	return [
		dotVector([p0[0], u[0], v[0]], [1, cu, cv]),
		dotVector([p0[1], u[1], v[1]], [1, cu, cv]),
		dotVector([p0[2], u[2], v[2]], [1, cu, cv])
	];
}

export function getIntersectionArea(rectA, rectB) {
	const overlapX = Math.max(0, Math.min(rectA.left + rectA.width, rectB.left + rectB.width) - Math.max(rectA.left, rectB.left));
	const overlapY = Math.max(0, Math.min(rectA.top + rectA.height, rectB.top + rectB.height) - Math.max(rectA.top, rectB.top));
	return overlapX * overlapY;
}