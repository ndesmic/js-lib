import { promises } from "fs";

export async function getJson(path){
	const content = await promises.readFile(path, "utf-8");
	return JSON.parse(content);
}