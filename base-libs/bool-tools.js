var BoolTools = (function(){

	function mapTruth(table){
		var truthString = "";
		for(var i = 1; i < arguments.length; i++){
			truthString += arguments[i] ? "T" : "F";
		}
		var lookups = Object.keys(table);
		for(var j = 0; j < lookups.length; j++){
		  var regex = new RegExp(lookups[j].replace(/\?/g, "."), "g");
		  if(regex.test(truthString)){
		    return table[lookups[j]];
		  }
		}
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