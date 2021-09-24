export function sync(callback) {
	callback();
}

export function microtask(callback) {
	queueMicrotask(callback);
}

const mc = new MessageChannel();
export function task(callback) {
	mc.port1.postMessage(null);
	mc.port2.addEventListener("message", () => callback(), { once: true });
	mc.port2.start();
}