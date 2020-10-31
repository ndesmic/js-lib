import { h } from "../simple-implementations/hyper.js";

describe("h", () => {
  it("creates simple element with attr and text node", () => {
    const result = h("span", { class : "red" }, "Hello World!");

    expect(result.tagName).toEqual("SPAN");
    expect(result.getAttribute("class")).toEqual("red");
    expect(result.textContent).toEqual("Hello World!");
  });
  it("h creates simple element with attr and nested node", () => {
    const result = h("span", { class: "red" }, h("a", { class: "inner" }, "Nested"));

    expect(result.tagName).toEqual("SPAN");
    expect(result.getAttribute("class")).toEqual("red");
    expect(result.children[0].tagName).toEqual("A");
    expect(result.children[0].getAttribute("class")).toEqual("inner");
    expect(result.children[0].textContent).toEqual("Nested");
  });
});