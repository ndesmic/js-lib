var DomTools = (function(){
  
  function removeChildren(element){
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
  
  function removeElement(element){
    element.parentNode.removeChild(element);
  }
  
  function insertAtCursor(element, value){
		if(element.tagName == "TEXTAREA"){
			var startPosition = element.selectionStart;
			var endPosition = element.selectionEnd;
			element.value = element.value.substring(0, startPosition) + value + element.value.substring(endPosition, element.value.length);
			//move cursor
			var newIndex = startPosition + value.length;
			element.setSelectionRange(newIndex, newIndex);
		}
	}
	
	function fireEvent(element,event){
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true ); // event type,bubbling,cancelable
    return !element.dispatchEvent(evt);
  }
  
  function createOptionList(list, valueFunc, displayFunc){
    var docFrag = document.createDocumentFragment();
    
    for(var i = 0; i < list.length; i++){
      var option = document.createElement("option");
      option.value = valueFunc ? valueFunc(list[i]) : list[i];
      option.textContent = displayFunc ? displayFunc(list[i]) : list[i];
      docFrag.appendChild(option);
    }
    return docFrag;
  }

  function getMatchingCss(element) {
    var sheets = document.styleSheets;
    var matches = [];
    element.matches = element.matches || element.msMatchesSelector;
    for (var i in sheets) {
        var rules = sheets[i].rules || sheets[i].cssRules;
        for (var rule in rules) {
            if (element.matches(rules[rule].selectorText)) {
                matches.push(rules[rule].cssText);
            }
        }
    }
    return matches;
  }

  function cloneParentNodeTree(el){
  	var nodes = [];
    while(el.parentNode){
    	nodes.unshift(el.cloneNode(false));
      el = el.parentNode;
    }
    var root = nodes[0];
    for(var i = 1; i < nodes.length; i++){
    	nodes[i - 1].appendChild(nodes[i]);
    }
    
    return {
    	root : root,
      element : nodes[nodes.length - 1]
    };
  }

  return {
    removeChildren : removeChildren,
    removeElement : removeElement,
    insertAtCursor : insertAtCursor,
    fireEvent : fireEvent,
    createOptionList : createOptionList,
    getMatchingCss : getMatchingCss,
    cloneParentNodeTree : cloneParentNodeTree
  };
  
})();