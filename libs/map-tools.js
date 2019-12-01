var MapTools = (function(){

    function getFromMapTree(map, ...accessors){
      let value = map;
      for(var i = 0; i < accessors.length; i++){
	      if(value.has(accessors[i])){
	        value = value.get(accessors[i]);
	      }else{
	        return null;
	      }
	    }
	    return value;
    }
    
    function setToMapTree(map, ...accessors){
      for(var i = 0; i < accessors.length - 1; i++){
        if(i === accessors.length - 2){
          map.set(accessors[i], accessors[i + 1]);
        }
	      if(map.has(accessors[i])){
	        map = map.get(accessors[i]);
	      }else{
	        let newMap = new Map();
	        map.set(accessors[i], newMap);
	        map = newMap;
	      }
	    }
    }

    return {
        setToMapTree : setToMapTree,
        getFromMapTree : getFromMapTree
    };
})();