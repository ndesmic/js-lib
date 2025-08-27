import { getInt, getBool, getOption, getNormal } from "../../libs/random-tools.js";
import { standardDeviation, average } from "../../libs/stat-tools.js";

//As you might expect these can be a bit unstable

describe("random-tools", () => {
	describe(".getInt", () => {
		it("gets random integer", () => {
			for (let i = 0; i < 1000; i++) {
				const value = getInt(10); //should get 0 - 9
				expect(value).toBeLessThan(10);
				expect(value).toBeGreaterThanOrEqual(0);
			}
		});
	});

	describe(".getBool", () => {
		it("gets random bool", () => {
			const valuesTrue = [];
			const valuesFalse = [];

			for (let i = 0; i < 1000; i++) {
				const value = getBool();
				expect(typeof value === "boolean").toBeTrue;
				if (value) {
					valuesTrue.push(value);
				} else {
					valuesFalse.push(value);
				}
			}

			const all = valuesTrue.length + valuesFalse.length;
			expect(valuesTrue.length / all).toBeGreaterThan(0.4);
			expect(valuesTrue.length / all).toBeLessThan(0.6);
			expect(valuesFalse.length / all).toBeGreaterThan(0.4);
			expect(valuesFalse.length / all).toBeLessThan(0.6);
		});
	});

	describe(".getOption", () => {
		it("gets random option", () => {
			const valuesOrange = [];
			const valuesApple = [];
			const valuesBanana = [];
			for (let i = 0; i < 1000; i++) {
				const value = getOption(["orange", "apple", "banana"]);
				expect(value == "orange" || value == "apple" || value == "banana").toBeTrue;
				if (value == "apple") {
					valuesApple.push(value);
				} else if (value == "orange") {
					valuesOrange.push(value);
				} else {
					valuesBanana.push(value);
				}
			}

			const all = valuesOrange.length + valuesBanana.length + valuesApple.length; 
			expect(valuesOrange.length / all).toBeGreaterThan(0.25); 
			expect(valuesOrange.length / all).toBeLessThan(0.4);
			expect(valuesApple.length / all).toBeGreaterThan(0.25); 
			expect(valuesApple.length / all).toBeLessThan(0.4);
			expect(valuesBanana.length / all).toBeGreaterThan(0.25);
			expect(valuesBanana.length / all).toBeLessThan(0.4);
		});
	});

	describe(".getNormal", () => {
		it("gets normal random", () => {
			const values = [];
			for (let i = 0; i < 1000; i++) {
				values.push(getNormal());
			}

			const std = standardDeviation(values);
			const avg = average(values);

			expect(std).toBeGreaterThan(0.9);
			expect(std).toBeLessThan(1.1);
			expect(avg).toBeGreaterThan(-0.1);
			expect(avg).toBeLessThan(0.1)
		});
	});
});