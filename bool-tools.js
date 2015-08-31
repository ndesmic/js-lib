var BooleanTools = (function(){

	function mapTruth(table){
		var truthstring = "";
		for(var i = 1; i < arguments.length; i++){
			truthstring += arguments[i] ? "T" : "F";
		}
		return table[truthstring];
	}
	
	return {
		mapTruth : mapTruth
	};
	
})();