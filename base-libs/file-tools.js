export function download(url, fileName) {
	const link = document.createElement("a");
	link.href = url;
	link.download = fileName;
	link.click();
}

export const createFile = (text, mime) =>
	"data:" + mime + ";utf-8," + text;

export const createEmptyFile = (mime) => 
	createFile("", mime);

export function readAsArrayBuffer(file) {
	return new Promise(function (resolve, reject) {
		const reader = new FileReader();
		reader.onload = function (e) {
			resolve(e.target.result);
		};
		reader.onerror = function (e) {
			reject(e);
		};
		reader.readAsArrayBuffer(file);
	});
}

export function readAsJson(file) {
	return new Promise(function (resolve, reject) {
		const reader = new FileReader();
		reader.onload = function (e) {
			resolve(JSON.parse(e.target.result));
		};
		reader.onerror = function (e) {
			reject(e);
		};
		reader.readAsText(file);
	});
}