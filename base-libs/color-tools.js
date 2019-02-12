var ColorTools = (function () {

	function hexToColor(hex) {
		hex = hex.substr(1); //remove #

		var red = parseInt(hex.substring(0, 2), 16);
		var green = parseInt(hex.substring(2, 4), 16);
		var blue = parseInt(hex.substring(4, 6), 16);
		var alpha = parseInt(hex.substring(6, 8), 16);

		return {
			red: red,
			green: green,
			blue: blue,
			alpha: alpha
		};
	}

	function colorToHex(rgba) {
		var red = StringTools.pad(parseInt(rgba.red).toString(16), 2);
		var green = StringTools.pad(parseInt(rgba.green).toString(16), 2);
		var blue = StringTools.pad(parseInt(rgba.blue).toString(16), 2);
		var alpha = rgba.alpha ? StringTools.pad(parseInt(rgba.alpha).toString(16), 2) : "";

		return "#" + red + green + blue + alpha;
	}

	function colorToRgba(rgba) {
		var out = "rgba(";
		out += rgba.red + ",";
		out += rgba.green + ",";
		out += rgba.blue;
		if (rgba.alpha) {
			out += "," + rgba.alpha;
		} else {
			out += ",1";
		}
		out += ")";

		return out;
	}

	function colorFromOpacityResult(result, base, opacity) {
		var red = (result.red - (opacity * base.red)) / (1 - opacity);
		var green = (result.green - (opacity * base.green)) / (1 - opacity);
		var blue = (result.blue - (opacity * base.blue)) / (1 - opacity);

		return {
			red: red,
			green: green,
			blue: blue,
			alpha: opacity
		};
	}

	function getDistance(color1, color2) {
		var redDist = color1.red - color2.red;
		var greenDist = color1.green - color2.green;
		var blueDist = color1.blue - color2.blue;
		return Math.sqrt(Math.pow(redDist, 2), Math.pow(greenDist, 2), Math.pow(blueDist, 2));
	}

	function getGradientPoint(start, end, position) {
		return {
			red: (end.red - start.red) * position,
			green: (end.green - start.green) * position,
			blue: (end.blue - start.blue) * position
		};
	}

	function getLumaRgb(color){
		return (color.red + color.blue + color.green) / 768;
	}

	function getLumaYiq(color){
		return (((color.red * 299) + (color.green * 587) + (color.blue * 114)) / 1000) / 256;
	}

	return {
		hexToColor,
		colorToHex,
		colorToRgba,
		colorFromOpacityResult,
		getDistance,
		getGradientPoint,
		getLumaRgb,
		getLumaYiq
	};

})();