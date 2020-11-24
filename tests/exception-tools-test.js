import { multiTry } from "../libs/exception-tools.js";

describe("mutiTry", () => {
	it("tries one thing", () => {
		const result = multiTry(
			() => "yup"
		);
		expect(result).toBe("yup");
	});
	it("tries multiple things", () => {
		const result = multiTry(
			() => { throw "Foo"; },
			() => { throw new Error("Bar"); },
			() => "yes"
		);
		expect(result).toBe("yes");
	});
	it("tries multiple things and stops early", () => {
		const result = multiTry(
			() => { throw "Foo"; },
			() => { throw new Error("Bar"); },
			() => "uh huh",
			() => "nope",
			() => "nada"
		);
		expect(result).toBe("uh huh");
	});
	it("tries all and fails", () => {
		expect(() => {
			const result = multiTry(
				() => { throw "Foo"; },
				() => { throw new Error("Bar"); },
				() => { throw "baz"; }
			);
		}).toThrow("baz");
	});
});