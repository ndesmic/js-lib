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
  
  return {
    removeChildren : removeChildren,
    removeElement : removeElement,
    insertAtCursor : insertAtCursor,
    fireEvent : fireEvent,
    createOptionsList : createOptionsList
  };
  
})();