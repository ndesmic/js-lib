import { parseKeyVals } from "../../formats/keyval.js";
import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

describe("parseKeyVals", () => {
   it("parses keyvals", () => {
	  const keyvals =  `
		 name: Apple
		 ===========
		 color: Red 

		 id: 1
	  `;
	  const result = parseKeyVals(keyvals);

	  expect(result).toEqual({
		 name: "Apple",
		 color: "Red",
		 id: "1"
	  })
   });
});