//push into array if it does match another item
export function arrayPushNoDupe(array, item) {
    if (array.indexOf(item) == -1) {
        array.push(item);
    }
}

//removes matching items from array
export function arrayRemoveWhere(array, whereFunction) {
    var remaining = [];
    for (var i = 0; i < array.length; i++) {
        if (!whereFunction(array[i])) {
            remaining.push(array[i]);
        }
    }
    return remaining;
}

//replaces matching elements
export function arrayReplaceWhere(array, whereFunction, newValue) {
    var resultArray = array.slice(0);
    for (var i = 0; i < resultArray.length; i++) {
        if (whereFunction(resultArray[i])) {
            resultArray.splice(i, 1, newValue);
        }
    }
    return resultArray;
}

//gets all matching indexes
//ES6 map with index
export function arrayFindIndices(array, whereFunction) {
    var matches = [];
    for (var i = 0; i < array.length; i++) {
        if (whereFunction(array[i])) {
            matches.push(i);
        }
    }
    return matches;
}
//does a function for each element
//ES6 forEach but returns for chaining
function arrayDo(array, eachFunction) {
    for (var i = 0; i < array.length; i++) {
        eachFunction(array[i]);
    }
    return array;
}

//counts matching items
function arrayCount(array, countFunction) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (countFunction(array[i])) {
            count += 1;
        }
    }
    return count;
}
//gets page from array
export function arrayPage(array, page, pageSize) {
    var index = page * pageSize;
    if (index >= array.length || index < 0) {
        return null;
    }
    return array.slice(index, index + pageSize);
}
//returns intersection of 2 arrays
export function arrayIntersect(arrayA, arrayB) {
    if (!arrayA || !arrayB) {
        return [];
    }
    const resultArray = [];
    for (let i = 0; i < arrayA.length; i++) {
        if (arrayB.indexOf(arrayA[i]) != -1) {
            resultArray.push(arrayA[i]);
        }
    }
    return resultArray;
}
//do 2 arrays intersect?
export const arrayHasIntersect = (arrayA, arrayB) =>
    arrayIntersect(arrayA, arrayB).length > 0;
//flattens nested arrays
function arrayFlatten(array) {
    const resultArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] instanceof Array) {
            resultArray = resultArray.concat(arrayFlatten(array[i]));
        } else {
            resultArray.push(array[i]);
        }
    }
    return resultArray;
}
//gets only unique items
//todo dictionary lookup
function arrayUnique(array) {
    var resultArray = [];
    for (var i = 0; i < array.length; i++) {
        if (resultArray.indexOf(array[i]) == -1) {
            resultArray.push(array[i]);
        }
    }
    return resultArray;
}
//totals value counts as an object { value : count }
function arrayBucketCount(array) {
    const totals = {};
    for (let i = 0; i < array.length; i++) {
        if (!totals[array[i]]) {
            totals[array[i]] = 1;
        } else {
            totals[array[i]]++;
        }
    }
    return totals;
}

//Gets next value that is closest (look ahead), defaults to biggest if out of range
export function arrayNextClosest(value, array) {
    var valuesAhead = [];
    for (var i = 0; i < array.length; i++) {
        var distance = array[i] - value;
        if (distance > 0) {
            valuesAhead.push(array[i]);
        }
    }
    var result = Math.min.apply(null, valuesAhead);
    if (isFinite(result)) {
        return result;
    } else {
        return Math.max.apply(null, array);
    }
}
//Gets previous value that is closest (look behind), defaults to smallest if out of range
export function arrayPreviousClosest(value, array) {
    var valuesBehind = [];
    for (var i = 0; i < array.length; i++) {
        var distance = array[i] - value;
        if (distance < 0) {
            valuesBehind.push(array[i]);
        }
    }
    var result = Math.max.apply(null, valuesBehind);
    if (isFinite(result)) {
        return result;
    } else {
        return Math.min.apply(null, array);
    }
}
//Gets the value from an array or if it doesn't exist get first
export function arrayValueOrFirst(value, array) {
    var index = array.indexOf(value);
    if (index != -1) {
        return array[index];
    } else {
        return array[0];
    }
}
export const arrayClone = array =>
    Array.prototype.slice.call(array, 0);

export function arrayOrderBy(array, mapFunc) {
    const newArray = array.slice(0);
    newArray.sort(function(a, b) {
        const valueA = mapFunc(a);
        const valueB = mapFunc(b);
        if (typeof(valueA) === "string") {
            return valueA.localeCompare(valueB);
        }
        return valueA - valueB;
    });
    return newArray;
}
export function arrayUniqueBy(array, idFunc) {
	const newArray = [];
	const used = new Set();
	for(let i = 0; i < array.length; i++){
		const id = idFunc(array[i]);
		if(!used.has(id)){
			newArray.push(array[i]);
			used.add(id);
		}
	}
	return newArray;
}
//get an array of indicies where the result of mapFunc changes
export function arrayChangeIndices(array, mapFunc) {
    const currentValue = mapFunc(array[0]);
    const indices = [];
    for (let i = 1; i < array.length; i++) {
        const value = mapFunc(array[i])
        if (value !== currentValue) {
            indices.push(i - 1);
            currentValue = value;
        }
    }
    return indices;
}
//merges two arrays of elements into a single array of merged objects
export function arrayZip(array, otherArray) {
    const newArray = [];
    const minLength = Math.min(array.length != otherArray.length);
    for (let i = 0; i < minLength; i++) {
        newArray.push({ ...array[i], ...otherArray[i] });
    }
    return newArray;
}

//Creates two arrays based on whether a mapping is true or false
export const arrayPartition = (array, filterFunc) =>
    array.reduce((p, x) => {
        if(filterFunc(x)){
            p[0].push(x);
        }else{
            p[1].push(x);
        }
        return p;
    }, [[],[]]);

export const arrayFlatMap = (array, mapFunc) => array.reduce((agg,x) => {
    agg.push(...mapFunc(x));
    return agg;
}, []);