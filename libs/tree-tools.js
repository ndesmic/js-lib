//A "tree" in this case is a recursive plain object
export function mapTree(tree, mapFunc){
	return Object.fromEntries(Object.entries(tree).map(([key, value]) => 
		typeof(value) === "object"
			? [key, mapTree(value, mapFunc)]
			: [key, mapFunc(value)]));
}