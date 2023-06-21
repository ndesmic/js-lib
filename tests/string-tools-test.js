import {
    getStringInit,
    getLevenshteinDistance,
    parseXsv,
    parseKeyVals,
    mixedByteArrayToString,
    parseLiteralList
 } from "../libs/string-tools.js";


describe("getStringInit", () => {
    it("gets the init portion of the string", () => {
       expect(getStringInit("abc")).toBe("ab"); 
    });
});

describe("getLevenshteinDistance", () => {
    it("works for null case", () => {
        expect(getLevenshteinDistance("", "abc")).toBe(3);
        expect(getLevenshteinDistance("abc", "")).toBe(3); 
        expect(getLevenshteinDistance("", "")).toBe(0); 
     });
    it("works for equal strings", () => {
       expect(getLevenshteinDistance("abc", "abc")).toBe(0); 
    });
    it("works for deletions", () => {
        expect(getLevenshteinDistance("abc", "bc")).toBe(1); 
        expect(getLevenshteinDistance("abc", "ac")).toBe(1); 
        expect(getLevenshteinDistance("abc", "ab")).toBe(1); 
     });
     it("works for insertions", () => {
        expect(getLevenshteinDistance("abc", "aabc")).toBe(1); 
        expect(getLevenshteinDistance("abc", "abbc")).toBe(1); 
        expect(getLevenshteinDistance("abc", "abcc")).toBe(1); 
     });
     it("works for swaps", () => {
        expect(getLevenshteinDistance("abc", "xbc")).toBe(1); 
        expect(getLevenshteinDistance("abc", "axc")).toBe(1); 
        expect(getLevenshteinDistance("abc", "abx")).toBe(1); 
     });
});

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

describe(".parseLiteralList", () => {
   it("gets number values", () => {
      const result = parseLiteralList("1,2,3");
      expect(result).toEqual([1, 2, 3]);
   });
   it("gets float values", () => {
      const result = parseLiteralList("1.0,2.1,3.05,1e10");
      expect(result).toEqual([1.0, 2.1, 3.05, 1e10]);
   });
   it("gets string values", () => {
      const result = parseLiteralList('"one","two","three"');
      expect(result).toEqual(["one", "two", "three"]);
   });
   it("gets string values with commas", () => {
      const result = parseLiteralList('"one","two","three,four"');
      expect(result).toEqual(["one", "two", "three,four"]);
   });
   it("gets bool values", () => {
      const result = parseLiteralList('true, false, true, true');
      expect(result).toEqual([true, false, true, true]);
   });
   it("gets null values", () => {
      const result = parseLiteralList('null,1');
      expect(result).toEqual([null, 1]);
   });
   it("gets undefined values", () => {
      const result = parseLiteralList('undefined,"one"');
      expect(result).toEqual([undefined, "one"]);
   });
   it("gets mixed values", () => {
      const result = parseLiteralList('1,"two","three,four", 5, true, null, undefined');
      expect(result).toEqual([1, "two", "three,four", 5, true, null, undefined], "got mixed list");
   });
});

describe(".mixedByteArrayToString", () => {
   [
      { value: ["h", "e", "l", "l", "o"], result: "hello" },
      { value: [104, 101, 108, 108, 111], result: "hello" },
      { value: [104, "e", 108, "l", 111], result: "hello" },
      { value: ["he", "ll", "o"], result: "hello" }
   ].forEach(test => {
      it("makes a string", () => {
         const result = mixedByteArrayToString(test.value);
         expect(result).toEqual(test.result);
      });
   });
})