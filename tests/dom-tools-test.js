import { removeElement, replaceElement, cloneParentNodeTree } from "../libs/dom-tools.js";

describe("dom-tools", () => {
  beforeEach(() => {
    const div = document.createElement("div");
    div.id = "fixture";
    document.body.appendChild(div);
  });
  afterEach(() => {
    const fixture = document.querySelector("#fixture");
    fixture.parentNode.removeChild(fixture);
  });
  describe("removeElement", () => {

    it("removes an element", () => {
      const fixture = document.querySelector("#fixture");
      fixture.innerHTML = "<span id='test'></span>";
      const testElement = document.querySelector("#test");

      removeElement(testElement);

      const query = document.querySelector("#test");

      expect(query).toBeNull();
    });
  });

  describe("cloneParentNodeTree", () => {
    it("should create cloned tree", () => {
      const fixture = document.querySelector("#fixture");
      fixture.innerHTML = "<div class='outer'><span id='test'></span></div>";
      const testElement = document.querySelector("#test");

      const result = cloneParentNodeTree(testElement);

      const root = result.root;

      expect(root.tagName).toBe("HTML");
      expect(root.childNodes[0].tagName).toBe("BODY");
      expect(root.childNodes[0].childNodes[0].id).toBe("fixture");
      expect(root.childNodes[0].childNodes[0].childNodes[0].className).toBe("outer");
      expect(root.childNodes[0].childNodes[0].childNodes[0].childNodes[0].id).toBe("test");

      expect(result.element.id).toBe("test");
    });
  });

  describe("replaceElement", () => {
    it("should replace element", () => {
      const fixture = document.querySelector("#fixture");
      fixture.innerHTML = "<span id='test'></span>";
      const testElement = document.querySelector("#test");
      const newElement = document.createElement("div");
      newElement.id = "new-test";
      newElement.textContent = "Hello Replace!";

      replaceElement(testElement, newElement);

      const query = document.querySelector("#new-test");
      const oldQuery = document.querySelector("#test");

      expect(query).not.toBeNull;
      expect(oldQuery).toBeNull;
    });
  });
});