import {
    arrayFindIndices,
    arrayClone,
    arrayOrderBy,
    arrayChunk,
    arrayToTable,
    getRange
} from "../libs/array-tools.js";

describe("arrayFindIndicies", () => {
    it("gets indexes", () => {
        const index = arrayFindIndices([1,2,3,4,3], item => item == 3);
        expect(index).toEqual([2,4]);
    });
});


describe("arrayClone", () => {
    it("clones array", () => {
        const arr = [1,2,3];
        const clone = arrayClone(arr);
        expect(clone).toEqual(arr);
        clone[1] = 0;
        expect(arr[0]).toEqual(1);
    });
});

describe("arrayOrderBy", () => {
    it("sorts with mapper function (number)", () => {
        const result = arrayOrderBy([{ a : 3 }, { a : 1 }, { a : 2},{ a : 4},{ a : 5},{ a : 0}], item => item.a);
        expect(result).toEqual([
            { a : 0 },
            { a : 1 },
            { a : 2 },
            { a : 3 },
            { a : 4 },
            { a : 5 }
        ]);
    });
    it("sorts with mapper function (string)", () => {
        const result = arrayOrderBy([{ a : "cat" }, { a : "apple" }, { a : "boat" },{ a : "dog"},{ a : "eat"},{ a : "abacus" }], item => item.a);
        expect(result).toEqual([
          { a : "abacus" },
          { a : "apple" },
          { a : "boat" },
          { a : "cat" },
          { a : "dog" },
          { a : "eat" },
        ]);
    });
});

describe("arrayChunk", () => {
    it("chunks array", () => {
        const array = [1,2,3,4,5,6,7,8,9,10];
        expect(arrayChunk(array, 3)).toEqual([
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [10]
        ]);
    });
});

describe("arrayToTable", () => {
    it("produces a DOM table with headings", () => {
        const table = [
            ["Name", "Color", "Id"],
            ["Apple", "Red", 1],
            ["Banana", "Yellow", 2],
            ["Pear", "Green", 3]
        ];

        const result = arrayToTable(table, { headings: true });
        expect(result.tagName).toBe("TABLE");
        expect(result.children[0].tagName).toBe("THEAD");
        expect(result.children[0].children[0].tagName).toBe("TH");
        expect(result.children[0].children[0].textContent).toBe("Name");
        expect(result.children[0].children[1].tagName).toBe("TH");
        expect(result.children[0].children[1].textContent).toBe("Color");
        expect(result.children[0].children[2].tagName).toBe("TH");
        expect(result.children[0].children[2].textContent).toBe("Id");
        expect(result.children[1].tagName).toBe("TBODY");
        expect(result.children[1].children[0].tagName).toBe("TR");

        expect(result.children[1].children[0].children[0].tagName).toBe("TD");
        expect(result.children[1].children[0].children[0].textContent).toBe("Apple");
        expect(result.children[1].children[0].children[1].tagName).toBe("TD");
        expect(result.children[1].children[0].children[1].textContent).toBe("Red");
        expect(result.children[1].children[0].children[2].tagName).toBe("TD");
        expect(result.children[1].children[0].children[2].textContent).toBe("1");

        expect(result.children[1].children[1].children[0].tagName).toBe("TD");
        expect(result.children[1].children[1].children[0].textContent).toBe("Banana");
        expect(result.children[1].children[1].children[1].tagName).toBe("TD");
        expect(result.children[1].children[1].children[1].textContent).toBe("Yellow");
        expect(result.children[1].children[1].children[2].tagName).toBe("TD");
        expect(result.children[1].children[1].children[2].textContent).toBe("2");

        expect(result.children[1].children[2].children[0].tagName).toBe("TD");
        expect(result.children[1].children[2].children[0].textContent).toBe("Pear");
        expect(result.children[1].children[2].children[1].tagName).toBe("TD");
        expect(result.children[1].children[2].children[1].textContent).toBe("Green");
        expect(result.children[1].children[2].children[2].tagName).toBe("TD");
        expect(result.children[1].children[2].children[2].textContent).toBe("3");
    });
    it("produces a DOM table without headings", () => {
        const table = [
            ["Apple", "Red", 1],
            ["Banana", "Yellow", 2],
            ["Pear", "Green", 3]
        ];

        const result = arrayToTable(table);
        expect(result.tagName).toBe("TABLE");
        expect(result.children[0].tagName).toBe("TBODY");
        expect(result.children[0].children[0].tagName).toBe("TR");

        expect(result.children[0].children[0].children[0].tagName).toBe("TD");
        expect(result.children[0].children[0].children[0].textContent).toBe("Apple");
        expect(result.children[0].children[0].children[1].tagName).toBe("TD");
        expect(result.children[0].children[0].children[1].textContent).toBe("Red");
        expect(result.children[0].children[0].children[2].tagName).toBe("TD");
        expect(result.children[0].children[0].children[2].textContent).toBe("1");

        expect(result.children[0].children[1].children[0].tagName).toBe("TD");
        expect(result.children[0].children[1].children[0].textContent).toBe("Banana");
        expect(result.children[0].children[1].children[1].tagName).toBe("TD");
        expect(result.children[0].children[1].children[1].textContent).toBe("Yellow");
        expect(result.children[0].children[1].children[2].tagName).toBe("TD");
        expect(result.children[0].children[1].children[2].textContent).toBe("2");

        expect(result.children[0].children[2].children[0].tagName).toBe("TD");
        expect(result.children[0].children[2].children[0].textContent).toBe("Pear");
        expect(result.children[0].children[2].children[1].tagName).toBe("TD");
        expect(result.children[0].children[2].children[1].textContent).toBe("Green");
        expect(result.children[0].children[2].children[2].tagName).toBe("TD");
        expect(result.children[0].children[2].children[2].textContent).toBe("3");
    })
});

describe("getRange", () => {
    it("should get range (end only)", () => {
        const result = getRange({ end: 10 });
        expect(result).toEqual([0,1,2,3,4,5,6,7,8,9,10]);
    });
    it("should get range (start to end)", () => {
        const result = getRange({ start: -5, end: 10 });
        expect(result).toEqual([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
    it("should get range (start to end with step)", () => {
        const result = getRange({ start: -4, end: 10, step: 2 });
        expect(result).toEqual([-4, -2, 0, 2, 4, 6, 8, 10]);
    });
    it("should get range with remainder", () => {
        const result = getRange({ end: 10, step: 3 });
        expect(result).toEqual([0,3,6,9]);
    });
});


/*

QUnit.module(".arrayChangeIndices");
QUnit.test("gets array of indices", function(assert){
  var result = ArrayTools.arrayChangeIndices([
      { a : 3, b :"red" },
      { a : 1, b : "red" },
      { a : 2, b : "blue" },
      { a : 4, b : "yellow" },
      { a : 5, b : "yellow" },
      { a : 0, b : "orange"}
  ], item => item.b);
  assert.deepEqual(result, [1,2,4], "change indicies");
});

QUnit.module(".arrayUniqueBy");
QUnit.test("get unique elements", function(assert){
  var result = ArrayTools.arrayUniqueBy([
      { a : 3, b :"red" },
      { a : 1, b : "red" },
      { a : 2, b : "blue" },
      { a : 4, b : "yellow" },
      { a : 5, b : "yellow" },
      { a : 0, b : "orange"}
  ], item => item.b);
  assert.deepEqual(result, [
      { a : 3, b : "red" },
      { a : 2, b : "blue" },
      { a : 4, b : "yellow" },
      { a : 0, b : "orange" }
  ], "got unique elements");
});

QUnit.module(".arrayPartition");
QUnit.test("divides into 2 groups", function(assert){
  var result = ArrayTools.arrayPartition([0, 1,2,3,4,5,6,7,8,9], x => x < 5);
  assert.deepEqual(result, [
      [0,1,2,3,4],
      [5,6,7,8,9]
  ], "divided into groups");
});

QUnit.module(".arrayFlatMap");
QUnit.test("flatMaps array", assert => {
  const result = ArrayTools.arrayFlatMap([1,2,3], x => [x, x*2, x*3]);
  assert.deepEqual(result, [1,2,3,2,4,6,3,6,9], "flat maps array");
});

*/