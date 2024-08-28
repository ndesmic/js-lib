export function isPlainObject(value){
	if(typeof(value) !== "object" || value === null){
		return false;
	}
	if(value.nodeType){
		return false;
	}
	if(value.constructor && !Object.prototype.hasOwnProperty.call(value.constructor.prototype, "isPrototypeOf" )){
		return false;
	}

	return true;
}

	//Takes object of form { a : [], b : [], c : [] } and converts to [{a, b, c},...]
export function unpivot(pivotObject){
	var maxLength = 0;
	for(let key in pivotObject){
		maxLength = Math.max(pivotObject[key].length, maxLength);
	}
	var unpivotObjs = [];
	for(let i = 0; i < maxLength; i++){
		var unpivotObj = {};
		for(let key in pivotObject){
			if(pivotObject[key][i]){
				unpivotObj[key] = pivotObject[key][i];
			}
		}
		unpivotObjs.push(unpivotObj);
	}
	return unpivotObjs;
}

export function searchMap(map, key){
	for(var currentKey in map){
		if(currentKey == key){
			return map[key];
		}
	}
	return null;
}

export function isEmpty(obj){
  if(Array.isArray(obj)) {
		return obj.length === 0;
	}else if(typeof(obj) === "object"){
		return Object.keys(obj).length === 0;
	}
	return false;
}

export function deepClone(obj) {
	if(Array.isArray(obj)){
		const temp = [];
		for (let i = 0; i < obj.length; i++) {
			temp.push(deepClone(obj[i]));
		}
		return temp;
	}
	if(typeof(obj) === "object" && obj !== null){
		const temp = {};
		for (let key in obj) {
		  if (obj.hasOwnProperty(key)) {
			temp[key] = deepClone(obj[key]);
		  }
		}
		return temp;
	}
	return obj;
}

export function objectToArray(object, keyProp){
	var array = [];
	for(var key in object){
		var newObject = shallowClone(object[key]);
		if(keyProp){
			newObject[keyProp] = key;
		}
		array.push(newObject);
	}
	return array;
}

export function accessProperty(obj, accessor, defaultValue = null){
    if(!obj || !accessor){
          return defaultValue;
    }
    const accessorParts = typeof(accessor) === "string" ? accessor.split(".") : accessor;

    if(accessorParts.length === 1){
        return obj[accessorParts[0]] || defaultValue;
    }

    return accessProperty(obj[accessorParts[0]], accessorParts.slice(1), defaultValue);
}

//old
export function diff(oldObject, newObject){
	var diffObject;
	if(typeof(oldObject) === "object"){
		diffObject = {};
		for(var key in oldObject){
			diffObject[key] = diff(oldObject[key], newObject[key]);
			if(!diffObject[key]){
				delete diffObject[key];
			}
		}
		if(isEmpty(diffObject)){
			return null;
		}
		return diffObject;
	}else if(Array.isArray(oldObject)){
		diffObject = [];
		var largest = oldObject.length > newObject.length ? oldObject.length : newObject.length;
		for(var i = 0; i < oldObject.length; i++){
			diffObject[i] = diff(oldObject[i], newObject[i]);
		}
		if(isEmpty(diffObject)) return null;
		return diffObject;
	}else{
		if(oldObject == newObject){
			return null;
		}else{
			if(!oldObject && newObject){
				return newObject;
			}else if(!newObject && oldObject){
				return oldObject;
			}else{
				return [oldObject, newObject];
			}
		}
	}
}

export function diffObject(baseObject, testObject, path = ""){
	const added = [];
	const missing = [];
	const different = [];

	if(typeof(baseObject) !== typeof(testObject)){
		different.push({ path, baseValue: baseObject, testValue: testObject });
	} else if(typeof(baseObject) === "object" && typeof(testObject) === "object"){
		for(const key in baseObject){
			const newPath = path + "." + key;
			if(!testObject.hasOwnProperty(key)){
				missing.push(newPath);
			} else {
				const result = diffObject(baseObject[key], testObject[key], newPath);
				added.push(...result.added);
				missing.push(...result.missing);
				different.push(...result.different);
			}
		}

		for(const key in testObject){
			const newPath = path + "." + key;
			if(!baseObject.hasOwnProperty(key)){
				added.push(newPath);
			}
		}
	} else if(baseObject !== testObject){
		different.push({ path, baseValue: baseObject, testValue: testObject });
	}

	return {
		added,
		missing,
		different
	};
}

export function objectIsSuperset(objectTest, objectControl){
	if(objectTest instanceof Array && objectControl instanceof Array){
		for(var i = 0; i < objectControl.length; i++){
			if(!objectIsSuperset(objectTest[key], objectControl[key])){
				return false;
			}
		}
	}else if(objectTest instanceof Object && objectControl instanceof Object){
		for(var key in objectControl){
			if(!objectIsSuperset(objectTest[key], objectControl[key])){
				return false;
			}
		}
	}else{
		if(objectTest != objectControl){
			return false;
		}
	}
	return true;
}


export function pruneObject(obj){
  const newObj = {};
  for(let key in obj){
    if(obj[key] !== undefined){
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
