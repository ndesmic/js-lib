import { readFile, readdir, lstat } from "node:fs/promises";

export async function readJson(path){
	const content = await readFile(path, "utf-8");
	return JSON.parse(content);
}

export async function listDirectoryRecursive(dir, options) {
	const ignorePaths = options?.ignorePaths;

	for(const path of ignorePaths){
		if(path.test(dir)) return [];
	}
	if (!(await lstat(dir)).isDirectory()) {
		return [dir];
	}
	const files = await readdir(dir);
	const results = [];
	for (const file of files) {
		results.push(...(await listDirectoryRecursive(dir + "/" + file), options));
	}
	return results.flat(Infinity);
}