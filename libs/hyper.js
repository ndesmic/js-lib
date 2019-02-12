export function hyper(nodeName, attributes, ...children){
	const element = document.createElement(nodeName);
	if(attributes){
		Object.entries(attributes).reduce((element, [key,value]) => {
			element.setAttribute(key, value);
			return element;
		}, element);
	}
	if(children && children.length > 0){
		children.reduce((element, child) => {
			element.append(typeof(child) == "string"
				? element.appendChild(document.createTextNode(child))
				: element.appendChild(child)
			);
			return element;
		}, element);
	}
	return element;
}