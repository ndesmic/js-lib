"use strict";
var GeometryTools = (function(){

	const TWO_PI = Math.PI * 2;
	const HALF_PI = Math.PI / 2;
	const THREE_HALFS_PI = (3 * Math.PI) / 2;

	function getRayDirection(rayAngle){
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

	function normalizeAngle(angle){
		if(angle < 0){
			return TWO_PI - (Math.abs(angle) % TWO_PI);
		}
		return angle % TWO_PI;
	}

	function getDistanceFromOrigin(...dimensions){
		return Math.sqrt(dimensions.map(x => x*x).reduce((previous, current) => current + previous, 0));
	}
	
	//gets magnitude of a vector (distance without sqrt)
	function getMagnitude(vector){
		let magnitude = (vector.x ** 2) + (vector.y ** 2);
		if(vector.z !== undefined){
			magnitude += (vector.z ** 2);
		}
		return magnitude;
	}

	//gets the distance between two points
	function pointDistance(pointA, pointB){
		return Math.sqrt(pointMagnitudeDifference(pointA, pointB));
	}

	//a comparator for sorting by magnitude
	function magnitudeCompare(pointA, pointB){
		return getMagnitude(pointA) - getMagnitude(pointB);
	}
	
	//vector subtract
	function pointDifference(pointA, pointB){
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
	function pointMagnitudeDifference(pointA, pointB){
		return getMagnitude(pointDifference(pointA, pointB));
	}

	function pointToGrid(x, y, scale){
		var gy = Math.floor(y / scale);
		var gx = Math.floor(x / scale);
		return { x : gx, y : gy };
	}
	
	function degreesToRadians(deg){
		return deg * (Math.PI/180);
	}

	function radiansToDegrees(rad){
		return rad * (180/Math.PI);
	}

	return {
		TWO_PI,
		HALF_PI,
		THREE_HALFS_PI,
		getRayDirection,
		pointToGrid,
		normalizeAngle,
		getDistanceFromOrigin,
		degreesToRadians,
		radiansToDegrees
	};

})();