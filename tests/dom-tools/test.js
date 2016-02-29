QUnit.module(".removeElement");
QUnit.test("removes element", function(assert){
  var fixture = document.querySelector("#qunit-fixture");
  fixture.innerHTML = "<span id='test'></span>";
  var testElement = document.querySelector("#test");
  DomTools.removeElement(testElement);

  var query = document.querySelector("#test");

	assert.equal(query, null, "removed element");
});
QUnit.module(".cloneParentNodeTree");
QUnit.test("creates cloned tree", function(assert){
  var fixture = document.querySelector("#qunit-fixture");
  fixture.innerHTML = "<div class='outer'><span id='test'></span></div>";
  var testElement = document.querySelector("#test");
  var result = DomTools.cloneParentNodeTree(testElement);
  var root = result.root;

	assert.equal(root.tagName, "HTML", "got html");
	assert.equal(root.childNodes[0].tagName, "BODY", "got body");
	assert.equal(root.childNodes[0].childNodes[0].id, "qunit-fixture", "got fixture");
	assert.equal(root.childNodes[0].childNodes[0].childNodes[0].className, "outer", "got outer");
	assert.equal(root.childNodes[0].childNodes[0].childNodes[0].childNodes[0].id, "test", "got test");
	
	assert.equal(result.element.id, "test", "got element");
});