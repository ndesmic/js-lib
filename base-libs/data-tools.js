var DataTools = (function(){
  
  function csvToArray(input, columns){
		return xsvToArray(input, columns, ",");
	}
	
	function tsvToArray(input, columns){
		return xsvToArray(input, columns, "\t");
	}
  
  function xsvToArray(csv, columns, seperator){
    var lines = csv.split("\n");
    var array = [];
    var i = 0;
    
    if(!columns){
      columns = lines[0].split(seperator);
      i = 1;
    }
    
    for(; i < lines.length; i++){
      if(!lines[i].trim()){
				continue;
			}
      array.push(xsvLineToObject(lines[i], columns, seperator));
    }
    
    return array;
  }
  
  function xsvLineToObject(line, columns, seperator){
    var values = line.split(seperator);
		var obj = {};
		
		for(var i = 0; i < columns.length; i++){
			if(columns[i]){
				obj[columns[i]] = values[i].trim();
			}
		}
		
		return obj;
  }
  
  return {
    csvToArray : csvToArray,
    tsvToArray : tsvToArray,
    xsvLineToObject : xsvLineToObject,
    xsvToArray : xsvToArray,
    
  };
  
})();