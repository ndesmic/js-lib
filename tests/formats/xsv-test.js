import { parseXsv } from "../../formats/xsv.js";
import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

describe("parseXsv", () => {
   it("parses tsv to array", () => {
	  const xsv = `
	  Name\tColor\tId
	  Apple\tRed\t1
	  Pear\tGreen\t2
	  Grape\tPurple\t3
	  Banana\tYellow\t4
	  `
	  const result = parseXsv(xsv);
	  expect(result).toEqual([
		 ["Name", "Color", "Id"],
		 ["Apple", "Red", "1"],
		 ["Pear", "Green", "2"],
		 ["Grape", "Purple", "3"],
		 ["Banana", "Yellow", "4"]
	  ]);
   });
   it("parses csv to array", () => {
	  const xsv = `
	  Name, Color, Id
	  Apple, Red, 1
	  Pear, Green, 2
	  Grape, Purple, 3
	  Banana, Yellow, 4
	  `
	  const result = parseXsv(xsv, { valueDelimiter: "," });
	  expect(result).toEqual([
		 ["Name", "Color", "Id"],
		 ["Apple", "Red", "1"],
		 ["Pear", "Green", "2"],
		 ["Grape", "Purple", "3"],
		 ["Banana", "Yellow", "4"]
	  ]);
   });
});