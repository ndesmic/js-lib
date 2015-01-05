var RandomTools = (function(){

	function getInt(exclusiveCap){
		return Math.floor(Math.random() * exclusiveCap);
	}

	function getBool(){
		if(getInt(2) == 0){
			return true;
		}else{
			return false;
		}
	}

	function getOption(optionList){
		var index = getInt(optionList.length);
		return optionList[index];
	}

	return {
		getInt : getInt,
		getBool : getBool,
		getOption : getOption
	};

})();