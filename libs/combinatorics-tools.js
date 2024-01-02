export function getPermutations(items, size){
	size ??= items.length;
	if(size > items.length) return [];
	if(size === 1) return items.map(x => [x]);
	return items.flatMap(x => 
		getPermutations(items.filter(v => x !== v), size - 1).map(item => [x, ...item]));
}
