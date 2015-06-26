var ArrayTools = (function(){
	//push into array if it does match another item
	function arrayPushNoDupe(array, item){
		if(array.indexOf(item) == -1){
			array.push(item);
		}
	}
	
	//converts object array to converter function typed array
	function arraySelect(array, selectorFunction){
		var selectionArray = [];
		for(var i = 0; i < array.length; i++){
			selectionArray.push(selectorFunction(array[i]));
		}
		return selectionArray;
	}
	
	//returns matching elements
	function arrayWhere(array, whereFunction){
		var resultArray = [];
		for(var i = 0; i < array.length; i++){
			if(whereFunction(array[i])){
				resultArray.push(array[i]);
			}
		}
		return resultArray;
	}
	
	//removes matching items from array
	function arrayRemoveWhere(array, whereFunction){
		var remaining = [];
	
		for (var i = 0; i < array.length; i++) {
			if (!whereFunction(array[i])){
				remaining.push(array[i]);
			}
		}
	
		return remaining;
	}
	
	//replaces matching elements
	function arrayReplaceWhere(array, whereFunction, newValue){
		var resultArray = array.slice(0);
		for(var i = 0; i < resultArray.length; i++){
			if(whereFunction(resultArray[i])){
				resultArray.splice(i, 1, newValue);
			}
		}
		return resultArray;
	}
	
	// returns first match or null
	function arrayFirst(array, whereFunction){
		for(var i = 0; i < array.length; i++){
			if(whereFunction(array[i])){
				return array[i];
			}
		}
		return null;
	}
	
	//gets index of first match
	function arrayFirstIndex(array, whereFunction){
		for(var i = 0; i < array.length; i++){
			if(whereFunction(array[i])){
				return i;
			}
		}
		return null;
	}
	
	//gets all matching indexes
	function arrayIndexes(array, whereFunction){
	  var matches = [];
		for(var i = 0; i < array.length; i++){
			if(whereFunction(array[i])){
				matches.push(i);
			}
		}
		return matches;
	}
	
	//creates an aggregator
	function arrayAggregate(array, aggregateFunction, seed){
		var aggregate = seed;
		for(var i = 0; i < array.length; i++){
			aggregate = aggregateFunction(array[i], aggregate);
		}
		return aggregate;
	}
	
	//does a function for each element
	function arrayEach(array, eachFunction){
		for(var i = 0; i < array.length; i++){
			eachFunction(array[i]);
		}
		return array;
	}
	
	//does a function for each or something if array is empty
	function arrayEachOrElse(array, eachFunction, elseFunction){
		if(array.length > 0){
			for(var i = 0; i < array.length; i++){
				eachFunction(array[i]);
			}
		}else{
			elseFunction(array);
		}
		return array;
	}
	
	//returns true if any item matches
	function arrayAny(array, anyFunction){
		for(var i = 0; i < array.length; i++){
			if(anyFunction(array[i])){
				return true;
			}
		}
		return false;
	}
	
	//counts matching items
	function arrayCount(array, countFunction){
		var count = 0;
		for(var i = 0; i < array.length; i++){
			if(countFunction(array[i])){
				count += 1;
			}
		}
		return count;
	}
	
	//gets an abstract page from array
	function arrayPage(array, page, pageSize) {
		var index = page * pageSize;
		if (index >= array.length || index < 0) {
			return null;
		}
		return array.slice(index, index + pageSize);
	}
	
	//returns intersection of 2 arrays
	function arrayIntersect(arrayA, arrayB) {
		if (!arrayA || !arrayB) {
			return [];
		}
		var resultArray = [];
		for (var i = 0; i < arrayA.length; i++) {
			if (arrayB.indexOf(arrayA[i]) != -1) {
				resultArray.push(arrayA[i]);
			}
		}
		return resultArray;
	}
	
	//do 2 arrays intersect?
	function arrayHasIntersect(arrayA, arrayB) {
		return arrayIntersect(arrayA, arrayB).length > 0;
	}
	
	//flattens nested arrays
	function arrayFlatten(array) {
		var resultArray = [];
		for (var i = 0; i < array.length; i++) {
			if (array[i] instanceof Array) {
				resultArray = resultArray.concat(arrayFlatten(array[i]));
			} else {
				resultArray.push(array[i]);
			}
		}
		return resultArray;
	}
	
	//gets only unique items
	function arrayUnique(array) {
		var resultArray = [];
		for (var i = 0; i < array.length; i++) {
			if (resultArray.indexOf(array[i]) == -1) {
				resultArray.push(array[i]);
			}
		}
		return resultArray;
	}
	
	//do all item satisfy condition?
	function arrayAll(array, allFunction) {
		var resultArray = [];
		for (var i = 0; i < array.length; i++) {
			if (allFunction(array[i])) {
				resultArray.push(array[i]);
			}
		}
		return array.length == resultArray.length;
	}
	
	//totals value counts as an object { value : count }
	function arrayTotal(array) {
		var totals = {};
		for (var i = 0; i < array.length; i++) {
			if (!totals[array[i]]) {
				totals[array[i]] = 1;
			} else {
				totals[array[i]]++;
			}
		}
		return totals;
	}
	
	//adds index to all objects in array
	function arrayOrderIndex(array) {
		var resultArray = [];
		for (var i = 0; i < array.length; i++) {
			var value = array[i];
			value.index = i;
			resultArray.push(value);
		}
		return resultArray;
	}
	
	//Gets an item that would be before the item passed if it was inserted
	//expects presorted array for speed
	function arrayImmediatelyPrevious(array, item, compareFunc){
		var lastItem = null;
		for(var i = 0; i < array.length; i++){
			if(compareFunc(item, array[i]) <= 0){
				lastItem = array[i];
			}else{
				return lastItem;
			}
		}
		return lastItem;
	}
	
	//Gets the index of the item that would be before the item passed if it was inserted
	//expects presorted array for speed
	function arrayIndexImmediatelyPrevious(array, item, compareFunc){
		var lastItem = null;
		for(var i = 0; i < array.length; i++){
			if(compareFunc(item, array[i]) > 0){
				return i-1;
			}
		}
		return i-1;
	}
	
	//prints items in array as a grammatical series
	function arraySeriesText(items, mapperFunction){
		var text = "";
		for(var i = 0; i < items.length; i++){
			if(i === 0){
				text += mapperFunction(items[i]);
			}else if(i === items.length - 1){
				text += " and " + mapperFunction(items[i]);
			}else{
				text += ", " + mapperFunction(items[i]);
			}
		}
		return text;
	}
	
	//Gets next value that is closest (look ahead), defaults to biggest if out of range 
	function arrayNextClosest(value, array){
		var valuesAhead = [];
		for(var i = 0; i < array.length; i++){
			var distance = array[i] - value;
			if(distance > 0){
				valuesAhead.push(array[i]);
			}
		}
		var result = Math.min.apply(null, valuesAhead);
		if(isFinite(result)){
			return result;
		}else{
			return Math.max.apply(null, array);
		}
	}

	//Gets previous value that is closest (look behind), defaults to smallest if out of range 
	function arrayPreviousClosest(value, array){
		var valuesBehind = [];
		for(var i = 0; i < array.length; i++){
			var distance = array[i] - value;
			if(distance < 0){
				valuesBehind.push(array[i]);
			}
		}
		var result = Math.max.apply(null, valuesBehind);
		if(isFinite(result)){
			return result;
		}else{
			return Math.min.apply(null, array);
		}
	}
	
	//Gets the value from an array or if it doesn't exist get first
	function arrayValueOrFirst(value, array){
		var index = array.indexOf(value);
		if(index != -1){
			return array[index]; 
		}else{
			return array[0];
		}
	}
	
	function arrayClone(array){
	  return array.slice(0);
	}
	
	
	return {
		arrayOrderIndex : arrayOrderIndex,
		arrayTotal : arrayTotal,
		arrayAll : arrayAll,
		arrayUnique : arrayUnique,
		arrayFlatten : arrayFlatten,
		arrayHasIntersect : arrayHasIntersect,
		arrayIntersect : arrayIntersect,
		arrayWhere : arrayWhere,
		arrayPage : arrayPage,
		arrayCount : arrayCount,
		arrayAny : arrayAny,
		arrayEachOrElse : arrayEachOrElse,
		arrayEach : arrayEach,
		arrayAggregate : arrayAggregate,
		arrayFirstIndex : arrayFirstIndex,
		arrayIndexes : arrayIndexes,
		arrayFirst : arrayFirst,
		arrayReplaceWhere : arrayReplaceWhere,
		arrayRemoveWhere : arrayRemoveWhere,
		arraySelect : arraySelect,
		arrayPushNoDupe : arrayPushNoDupe,
		arrayImmediatelyPrevious : arrayImmediatelyPrevious,
		arrayIndexImmediatelyPrevious : arrayIndexImmediatelyPrevious,
		arraySeriesText : arraySeriesText,
		arrayPreviousClosest : arrayPreviousClosest,
		arrayNextClosest : arrayNextClosest,
		arrayClone : arrayClone
	};

})();