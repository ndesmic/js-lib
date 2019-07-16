import {
    arrayFindIndices,
    arrayClone,
    arrayOrderBy
} from "../../base-libs/array-tools.js";

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