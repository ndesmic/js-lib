import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { getFromMapTree, setToMapTree } from "../../libs/map-tools.js";

describe("map tools", () => {
  describe("getFromMapTree", () => {
    it("gets nested value", () => {
      const map = new Map();
      const innerMap = new Map();
      const innerInnerMap = new Map();
      innerInnerMap.set("baz", "value");
      innerMap.set("bar", innerInnerMap);
      map.set("foo", innerMap);
      const result = getFromMapTree(map, "foo", "bar", "baz");
      expect(result).toEqual("value");
    });
    it("gets null if no value in chain (mid)", () => {
      const map = new Map();
      const innerMap = new Map();
      const innerInnerMap = new Map();
      innerInnerMap.set("baz", "value");
      innerMap.set("bar", innerInnerMap);
      map.set("foo", innerMap);
      const result = getFromMapTree(map, "foo", "baz", "qux");
      expect(result).toEqual(null);
    });
    it("gets null if no value in chain (last)", () => {
      const map = new Map();
      const innerMap = new Map();
      const innerInnerMap = new Map();
      innerInnerMap.set("baz", "value");
      innerMap.set("bar", innerInnerMap);
      map.set("foo", innerMap);
      const result = getFromMapTree(map, "foo", "bar", "qux");
      expect(result).toEqual(null);
    });
  });
  describe("setToMapTree", () => {
    it("sets nested value (chain exists)", () => {
      const map = new Map();
      const innerMap = new Map();
      const innerInnerMap = new Map();
      innerInnerMap.set("baz", "value");
      innerMap.set("bar", innerInnerMap);
      map.set("foo", innerMap);
      setToMapTree(map, "foo", "bar", "baz", "newValue");
      expect(map.get("foo").get("bar").get("baz")).toEqual("newValue");
    });
    it("sets nested value (chain doesn't exists)", () => {
      const map = new Map();
      setToMapTree(map, "foo", "bar", "baz", "newValue");
      expect(map.get("foo").get("bar").get("baz")).toEqual("newValue");
    });
  });
});
