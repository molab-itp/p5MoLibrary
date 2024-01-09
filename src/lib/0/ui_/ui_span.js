//

function ui_break(my, id) {
  let element = ui_element(my, id);
  if (!element) {
    element = createElement('br');
    ui_fresh_element(my, element);
  }
  return element;
}
window.ui_break = ui_break;

function ui_span(my, id, html) {
  let span = ui_element(my, id);
  if (!span) {
    span = createSpan();
    ui_fresh_element(my, span);
  }
  span.html(html);
  return span;
}
window.ui_span = ui_span;

function ui_div(my, id, html) {
  let div = ui_element(my, id);
  if (!div) {
    div = createDiv();
    ui_fresh_element(my, div);
  }
  div.html(html);
  return div;
}
window.ui_div = ui_div;

// Create empty div or empty it if it already exists
function ui_div_empty(my, id) {
  let div = ui_element(my, id);
  if (!div) {
    div = createDiv();
    ui_fresh_element(my, div);
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

function ui_checkbox(my, label, value) {
  let chk = ui_element(my, label);
  if (!chk) {
    chk = createCheckbox(label, value);
    chk.style('display:inline');
    ui_fresh_element(my, chk);
  }
  return chk;
}
window.ui_checkbox = ui_checkbox;

function ui_createButton(my, label) {
  let element = ui_element(my, label);
  if (!element) {
    element = createButton(label);
    ui_fresh_element(my, element);
  }
  return element;
}
window.ui_createButton = ui_createButton;

function ui_select(my, id) {
  let element = ui_element(my, id);
  if (!element) {
    element = createSelect();
    ui_fresh_element(my, element);
  }
  return element;
}
window.ui_select = ui_select;

function ui_input(my, id, text) {
  let element = ui_element(my, id);
  if (!element) {
    element = createInput(text);
    ui_fresh_element(my, element);
  }
  return element;
}
window.ui_input = ui_input;

function ui_begin(my) {
  my.ui_id_index = 1;
}
window.ui_begin = ui_begin;

function ui_begin_update(my) {
  my.ui_id_index = 1001;
}
window.ui_begin_update = ui_begin_update;

function ui_element(my, id) {
  // console.log('ui_element id', id);
  if (!id) {
    id = 'uid_' + my.ui_id_index;
    my.ui_id_index++;
  }
  if (!my.ui_uids) {
    my.ui_uids = {};
  }
  my.ui_last_id = id;
  let element = my.ui_uids[id];
  return element;
}

function ui_fresh_element(my, element) {
  // console.log('ui_fresh_element my.ui_last_id', my.ui_last_id);
  my.ui_uids[my.ui_last_id] = element;
  element.id(my.ui_last_id);
  if (my.ui_container) {
    my.ui_container.child(element);
  }
}
