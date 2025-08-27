import { removeElement, replaceElement, cloneParentNodeTree, arrayToTable } from "../../libs/dom-tools.js";

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