var NumberTools = (function(){
	function precision(value, significantDigit){
		var multiplier = Math.pow(10, significantDigit);
		return Math.round(value * multiplier) / multiplier;
	}
	
	function isNumber (value) {
		return !isNaN(value-0) && value !== null && value !== "" && value !== false;
	}
	
	return {
		precision : precision,
		isNumber : isNumber
	};
	
})();