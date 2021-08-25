import { htmlDecode } from "../libs/encoding-tools.js";

describe("encoding-tools", () => {
	[
		["&lt;f32&gt;", "<f32>"],
		["foo&#8211;bar", "foo–bar"],
		["&amp;&amp;", "&&"],
		["&#38;&#38;&#38;", "&&&"],
		["&#x00026;&#x00026;&#x00026;&#x00026;", "&&&&"]
	]
		.forEach(test => it(`should decode ${test[0]} from html`, () => {
			expect(htmlDecode(test[0])).toEqual(test[1]);
		}));
});