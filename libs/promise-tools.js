export async function asyncTreeAll(tree) {
	const promisesToResolve = [];
	const promiseToIndex = new WeakMap();
	const entries = Object.entries(tree);

	for (const [key, value] of entries) {
		if (value instanceof Promise) {
			promiseToIndex.set(value, promisesToResolve.length);
			promisesToResolve.push(value);
		} else if (typeof (value) === "object") {
			promiseToIndex.set(value, promisesToResolve.length);
			promisesToResolve.push(asyncTreeAll(value));
		}
	}

	const results = await Promise.all(promisesToResolve);

	const resolvedEntries = [];
	for (const [key, value] of entries) {
		if (value instanceof Promise || typeof (value) === "object") {
			const index = promiseToIndex.get(value);
			resolvedEntries.push([key, results[index]]);
		} else {
			resolvedEntries.push([key, value]);
		}
	}

	return Object.fromEntries(resolvedEntries);
}
