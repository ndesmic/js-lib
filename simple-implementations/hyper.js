export function h(nodeName, attributes, ...children){
	const element = document.createElement(nodeName);
	if(attributes){
		for(let [key, val] of Object.entries(attributes)){
			element.setAttribute(key, val);
		}
	}
	if(children && children.length > 0){
		for(let child of children){
			element.append(typeof (child) == "string"
				? element.appendChild(document.createTextNode(child))
				: element.appendChild(child)
			);
		}
	}
	return element;
}