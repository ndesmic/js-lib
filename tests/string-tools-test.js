import {
    getStringInit,
    getLevenshteinDistance
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