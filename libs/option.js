const Option = (function(){
	const none = Object.freeze({});

	function create(){
		if(value){
			return Object.freeze({
				hasValue : true,
				value : value
			});
		}
		return none;
	};
	
	return {
		create,
		None : none
	};
});
