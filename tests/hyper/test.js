QUnit.module(".h");

QUnit.test("h creates simple element with attr and text node", function(assert){
  	var result = Hyper.h("span", { class : "red" }, "Hello World!");

    assert.equal(result.tagName, "SPAN", "created tag");
    assert.equal(result.getAttribute("class"), "red", "created attr");
    assert.equal(result.textContent, "Hello World!", "created text");
});

QUnit.test("h creates simple element with attr and nested node", function(assert){
  	var result = Hyper.h("span", { class : "red" }, Hyper.h("a", { class : "inner" }, "Nested"));

    assert.equal(result.tagName, "SPAN", "created tag");
    assert.equal(result.getAttribute("class"), "red", "created attr");
    assert.equal(result.children[0].tagName, "A", "created nested A");
    assert.equal(result.children[0].getAttribute("class"), "inner", "created nested attr");
    assert.equal(result.children[0].textContent, "Nested", "created nested text");
});
