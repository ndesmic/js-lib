var BooleanTools = (function(){

	function mapTruth(table){
		var truthstring = "";
		for(var i = 1; i < arguments.length; i++){
			truthstring += arguments[i] ? "T" : "F";
		}
		return table[truthstring];
	}
	
	function chainAnd(){
		var result = arguments[0];
		for(var i = 1 ; i < arguments.length; i++){
			result = result && arguments[i];
		}
		return result;
	}
	
	function chainOr(){
		var result = arguments[0];
		for(var i = 1 ; i < arguments.length; i++){
			result = result || arguments[i];
		}
		return result;
	}
	
	return {
		mapTruth : mapTruth,
		chainAnd : chainAnd,
		chainOr : chainOr
	};
	
})();