export function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function removeElement(element) {
  element.parentNode.removeChild(element);
}

export function replaceElement(oldElement, newElement) {
  oldElement.parentNode.replaceChild(newElement, oldElement);
}

export function insertAtCursor(element, value) {
  if (element.tagName == "TEXTAREA") {
    const startPosition = element.selectionStart;
    const endPosition = element.selectionEnd;
    element.value = element.value.substring(0, startPosition) + value + element.value.substring(endPosition, element.value.length);
    //move cursor
    const newIndex = startPosition + value.length;
    element.setSelectionRange(newIndex, newIndex);
  }
}

export function fireEvent(element, eventName, bubbles = true, cancelable = true) {
  const event = document.createEvent("HTMLEvents");
  event.initEvent(eventName, bubbles, cancelable); // event type,bubbling,cancelable
  return element.dispatchEvent(event);
}

export function createOptionList(list, valueFunc = x => x, displayFunc = y => y) {
  const docFrag = document.createDocumentFragment();

  for (let i = 0; i < list.length; i++) {
    const option = document.createElement("option");
    option.value =  valueFunc(list[i]);
    option.textContent = displayFunc(list[i]);
    docFrag.appendChild(option);
  }
  return docFrag;
}

export function getMatchingCss(element) {
  const sheets = document.styleSheets;
  const matches = [];
  element.matches = element.matches || element.msMatchesSelector;
  for (let i in sheets) {
    const rules = sheets[i].rules || sheets[i].cssRules;
    for (let rule in rules) {
      if (element.matches(rules[rule].selectorText)) {
        matches.push(rules[rule].cssText);
      }
    }
  }
  return matches;
}

export function cloneParentNodeTree(element) {
  const nodes = [];
  while (element.parentNode) {
    nodes.unshift(element.cloneNode(false));
    element = element.parentNode;
  }
  const root = nodes[0];
  for (let i = 1; i < nodes.length; i++) {
    nodes[i - 1].appendChild(nodes[i]);
  }

  return {
    root,
    element: nodes[nodes.length - 1]
  };
}

export function copy(element) {
  const hasSelection = document.queryCommandEnabled('copy');
  if (!hasSelection) {
    console.log('copy not enabled');
  }
  element.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.log('execCommand Error', err);
  }
}

export function tableToArray(table){
  return [...table.querySelectorAll("tr")].map(row =>
    [...row.querySelectorAll("td")].map(td => td.textContent));
}

export function arrayToTable(array, { headings } = {}) {
  const table = document.createElement("table");
  let i = 0;
  if (headings) {
    const thead = document.createElement("thead");
    array[0].forEach(h => {
      const th = document.createElement("th");
      th.textContent = h;
      thead.append(th);
    });
    table.append(thead);
    i = 1;
  }
  const tbody = document.createElement("tbody");
  for (; i < array.length; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < array[i].length; j++) {
      const td = document.createElement("td");
      td.textContent = array[i][j];
      tr.append(td);
    }
    tbody.append(tr);
  }
  table.appendChild(tbody);
  return table;
}