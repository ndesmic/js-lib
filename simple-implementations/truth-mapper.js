let TruthMapper = (function(){
  
  const defaults = {
    withTable : {}
  };
  
  function create(options){
    var truthMapper = {};
    truthMapper.options = Object.assign({}, defaults, options);
    bind(truthMapper);
    return truthMapper;
  }
  
  function bind(truthMapper){
    truthMapper.withValues = withValues.bind(truthMapper);
    truthMapper.withTemplate = withTemplate.bind(truthMapper);
    truthMapper.tagsStartWith = tagsStartWith.bind(truthMapper);
    truthMapper.tagsEndWith = tagsEndWith.bind(truthMapper);
    truthMapper.template = template.bind(truthMapper);
    
    truthMapper.getResult = getResult.bind(truthMapper);
    truthMapper.getResultArray = getResultArray.bind(truthMapper);
    truthMapper.getResultNumber = getResultNumber.bind(truthMapper);
  }
  
  function withTable(table){
    this.options.withTable = table;
    return this;
  }
  
  function getResult(){
    if(typeof(arguments[0]) === "number"){
      return getResultNumber(arguments[0]);
    }
    if(Array.isArray(arguments[0])){
      return getResultArray(arguments[0]);
    }
    return getResultArray([...arguments]);
  }
  
  function getResultsNumber(num){
    
  }
  
  function getResultsArray(arr){
    var truthString = "";
		for(var i = 1; i < arr.length; i++){
			truthString += arr[i] ? "T" : "F";
		}
		var lookups = Object.keys(this.options.withTable);
		for(var j = 0; j < lookups.length; j++){
		  var regex = new RegExp(lookups[j].replace(/\?/g, "."), "g");
		  if(regex.test(truthString)){
		    return this.options.table[lookups[j]];
		  }
		}
		if(this.options.withTable.else !== undefined){
		  return this.options.withTable.else;
		}
  }
  
  return {
    create : create
  };
  
})();