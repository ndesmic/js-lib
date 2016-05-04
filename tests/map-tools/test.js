QUnit.module(".getFromMapTree");

QUnit.test("gets nested value", function(assert){
  const map = new Map();
  const innerMap = new Map();
  const innerInnerMap = new Map();
  innerInnerMap.set("baz", "value");
  innerMap.set("bar", innerInnerMap);
  map.set("foo", innerMap);
  var result = MapTools.getFromMapTree(map, "foo", "bar", "baz");
  assert.equal(result, "value", "got nested value");
});
QUnit.test("gets null if no value in chain (mid)", function(assert){
  const map = new Map();
  const innerMap = new Map();
  const innerInnerMap = new Map();
  innerInnerMap.set("baz", "value");
  innerMap.set("bar", innerInnerMap);
  map.set("foo", innerMap);
  var result = MapTools.getFromMapTree(map, "foo", "baz", "qux");
  assert.equal(result, null, "got null");
});
QUnit.test("gets null if no value in chain (last)", function(assert){
  const map = new Map();
  const innerMap = new Map();
  const innerInnerMap = new Map();
  innerInnerMap.set("baz", "value");
  innerMap.set("bar", innerInnerMap);
  map.set("foo", innerMap);
  var result = MapTools.getFromMapTree(map, "foo", "bar", "qux");
  assert.equal(result, null, "got null");
});

QUnit.module(".setTpMapTree");

QUnit.test("sets nested value (chain exists)", function(assert){
  const map = new Map();
  const innerMap = new Map();
  const innerInnerMap = new Map();
  innerInnerMap.set("baz", "value");
  innerMap.set("bar", innerInnerMap);
  map.set("foo", innerMap);
  MapTools.setToMapTree(map, "foo", "bar", "baz", "newValue");
  assert.equal(map.get("foo").get("bar").get("baz"), "newValue", "set nested value");
});
QUnit.test("sets nested value (chain doesn't exists)", function(assert){
  const map = new Map();
  MapTools.setToMapTree(map, "foo", "bar", "baz", "newValue");
  assert.equal(map.get("foo").get("bar").get("baz"), "newValue", "set nested value");
});
