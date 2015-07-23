QUnit.module(".removeElement");
QUnit.test("removes element", function(assert){
  var fixture = document.querySelector("#qunit-fixture");
  fixture.innerHTML = "<span id='test'></span>";
  var testElement = document.querySelector("#test");
  DomTools.removeElement(testElement);

  var query = document.querySelector("#test");

	assert.equal(query, null, "removed element");
});