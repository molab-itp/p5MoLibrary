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
  let div = select('#' + id);
  if (!div) {
    div = createDiv().id(id);
    ui_container_child(my, div);
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
    ui_container_child(my, div);
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

// !!@ Should all ui_* api have id so can be called repeatly without extra creation
//

function ui_createCheckbox(my, label, value) {
  let chk = createCheckbox(label, value);
  chk.style('display:inline');
  ui_container_child(my, chk);
  return chk;
}
window.ui_createCheckbox = ui_createCheckbox;

function ui_createButton(my, label) {
  let element = createButton(label);
  ui_container_child(my, element);
  return element;
}
window.ui_createButton = ui_createButton;

function ui_createSelect(my) {
  let element = createSelect();
  ui_container_child(my, element);
  return element;
}
window.ui_createSelect = ui_createSelect;

function ui_createInput(my, text) {
  let element = createInput(text);
  ui_container_child(my, element);
  return element;
}
window.ui_createInput = ui_createInput;

function ui_begin() {
  my.ui_id_index = 1;
}
window.ui_begin = ui_begin;

function ui_update_begin() {
  my.ui_id_index = 1001;
}
window.ui_update_begin = ui_update_begin;

// function ui_break(my) {
//   let id = 'break' + my.ui_id_index;
//   my.ui_id_index++;
//   let element = select('#' + id);
//   if (!element) {
//     element = createElement('br').id(id);
//     ui_container_child(my, element);
//   }
//   return element;
// }
// window.ui_break = ui_break;

function ui_element(my, id) {
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
  my.ui_uids[my.ui_last_id] = element;
  element.id(my.ui_last_id);
  if (my.ui_container) {
    my.ui_container.child(element);
  }
}

function ui_container_child(my, element) {
  if (my.ui_container) {
    my.ui_container.child(element);
  }
}
