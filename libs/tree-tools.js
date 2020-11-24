//A "tree" in this case is a recursive plain object
export function mapTree(tree, mapValueFunc = x => x, mapKeyFunc = x => x, path = []){
	return Object.fromEntries(Object.entries(tree).map(([key, value]) => 
		typeof(value) === "object"
			? [mapKeyFunc(key, path, tree), mapTree(value, mapValueFunc, mapKeyFunc, [...path, key])]
			: [mapKeyFunc(key, path, tree), mapValueFunc(value, key, path, tree)]));
}

export function filterTree(tree, filterFunc) {
	return Object.fromEntries(Object.entries(tree).flatMap(([key, value]) => {
		if (typeof (value) === "object") {
			const newValue = filterTree(value, filterFunc);
			if (Object.keys(newValue).length > 0) {
				return [[key, newValue]];
			} else {
				return [];
			}
		} else {
			if (filterFunc(value)) {
				return [[key, value]];
			} else {
				return [];
			}
		}
	}));
}