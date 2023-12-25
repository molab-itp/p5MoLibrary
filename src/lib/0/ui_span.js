//

function ui_span(my, id, html) {
  let span = select('#' + id);
  if (!span) {
    span = createSpan().id(id);
  }
  span.html(html);
  return span;
}
window.ui_span = ui_span;

function ui_div(my, id, html) {
  let div = select('#' + id);
  if (!div) {
    div = createDiv().id(id);
  }
  div.html(html);
  return div;
}
window.ui_div = ui_div;

// Create empty div or empty it if it already exists
function ui_div_empty(my, id) {
  let div = select('#' + id);
  // console.log('ui_device_selection div', div);
  if (!div) {
    div = createDiv().id(id);
  } else {
    let children = div.child();
    for (let index = children.length - 1; index >= 0; index--) {
      let elm = children[index];
      elm.remove();
    }
  }
  return div;
}
window.ui_div_empty = ui_div_empty;

function ui_createCheckbox(label, value) {
  let chk = createCheckbox(label, value);
  chk.style('display:inline');
  return chk;
}
window.ui_createCheckbox = ui_createCheckbox;

function ui_createButton(my, label) {
  //
  return createButton(label);
}
window.ui_createButton = ui_createButton;

function ui_createSelect(my) {
  //
  return createSelect();
}
window.ui_createSelect = ui_createSelect;

function ui_createInput(my, text) {
  //
  return createInput(text);
}
window.ui_createInput = ui_createInput;
