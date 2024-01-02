export function getPermutations(items){
	if(items.length === 0) return [];
	if(items.length === 1) return [items];
	return items.flatMap(x => 
		getPermutations(items.filter(v => x != v)).map(vs => [x, ...vs]));
}