const Hyper = (function(){

	function h(nodeName, attributes, ...children){
		const element = document.createElement(nodeName);
		element.attributes = attributes;
		if(attributes){
			for(let key in attributes){
				element.setAttribute(key, attributes[key]);
			}
		}
		if(children && children.length > 0){
			for(let i = 0; i < children.length; i++){
				if(typeof(children[i]) == "string"){
					const text = document.createTextNode(children[i]);
					element.appendChild(text);
				}else{
					element.appendChild(children[i]);
				}
			}
		}
		return element;
	}

	return {
		h
	};

})();
