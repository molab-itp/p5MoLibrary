//
function ui_log(my, ...args) {
  if (!my.logLines) {
    ui_log_init(my);
  }
  let key = args[0];
  let ent = ui_logTagEntry(key);
  ent.count++;
  if (ent.console) {
    console.log(...args);
  }
  // if (ent.log)
  {
    let str = args.join(' ');
    ui_log_add(my, my.logLines, str);
    ui_log_add(my, ent.lines, str);
    str = my.logLines.join('<br/>');
    my.logDiv.html(str);
    // console.log('str', str);
  }
}
window.ui_log = ui_log;

function ui_log_add(my, lines, str) {
  lines.push(str);
  if (lines.length > my.logLinesMax) {
    lines.splice(0, 1);
  }
}

function ui_log_clear(my) {
  my.logLines = [];
  my.logDiv.html('');
}
window.ui_log_clear = ui_log_clear;

function ui_logTagEntry(key) {
  let ent = my.logTags[key];
  if (!ent) {
    ent = { count: 0, console: 0, lines: [] };
    my.logTags[key] = ent;
  }
  return ent;
}

function ui_log_init(my) {
  my.logLines = [];
  my.logDiv = createDiv('');
  if (!my.logLinesMax) {
    my.logLinesMax = 5;
  }
  if (!my.logTags) {
    my.logTags = {};
  }
}

function ui_error(...args) {
  ui_log(...args);
}
window.ui_error = ui_error;

//
function ui_span(id, html) {
  let span = select('#' + id);
  if (document.fullscreenElement) {
    if (span) {
      span.remove();
    }
    return null;
  }
  if (!span) {
    span = createSpan().id(id);
  }
  span.html(html);
  return span;
}
window.ui_span = ui_span;

function ui_update_begin() {
  my.ui_id_index = 0;
}
window.ui_update_begin = ui_update_begin;

function ui_break(my) {
  my.ui_id_index++;
  let id = 'break' + my.ui_id_index;
  let elm = select('#' + id);
  if (!elm) {
    elm = createElement('br').id(id);
  }
  return elm;
}
window.ui_break = ui_break;

function ui_toggle_scroll(my) {
  if (window.scrollY > 0) {
    // scroll down some. jump back to top
    console.log('ui_toggle_scroll jump to top');
    window.scrollBy(0, -1000);
    my.scrolling = 0;
  } else {
    // At top. initiated scrolling
    console.log('ui_toggle_scroll start');
    my.scrolling = 1;
    setTimeout(function () {
      console.log('ui_toggle_scroll stop');
      my.scrolling = 0;
    }, my.scrollStopSecs * 1000);
  }
}
window.ui_toggle_scroll = ui_toggle_scroll;

function ui_check_scroll(my) {
  if (my.scrolling) {
    window.scrollBy(0, 1);
  }
}
window.ui_check_scroll = ui_check_scroll;

function ui_div(id, html) {
  let div = select('#' + id);
  if (document.fullscreenElement) {
    if (div) {
      div.remove();
    }
    return null;
  }
  if (!div) {
    div = createDiv().id(id);
  }
  div.html(html);
  return div;
}
window.ui_div = ui_div;

// Create empty div or empty it if it already exists
function ui_div_empty(id) {
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

function ui_init_debug_pane(my) {
  my.debug_div = ui_div('debug', 'Welcome to the debug pane');
  if (!my.debugFlag) {
    my.debug_div.elt.classList.toggle('hidden');
  }
}
window.ui_init_debug_pane = ui_init_debug_pane;

function ui_debugFlag_changed(my, newValue) {
  my.debugFlag = newValue;
  my.debug_div.elt.classList.toggle('hidden');
  // console.log('my.logTags', my.logTags);
  if (!my.logTags) return;
  let div = ui_div_empty('debug');
  for (let key in my.logTags) {
    let ent = my.logTags[key];
    // console.log('my.logTags key=', key, 'ent', ent);
    let span = createSpan(key);

    let chk = ui_createCheckbox('console', ent.console);
    // chk.style('display:inline');
    chk.changed(function () {
      ent.console = this.checked();
    });

    let spanCount = createSpan(' count=' + ent.count);

    div.child(createElement('br'));
    div.child(span);
    div.child(chk);
    div.child(spanCount);

    div.child(createElement('br'));

    let span2 = createSpan(ent.lines[0]);
    div.child(span2);

    div.child(createElement('br'));
  }
  div.child(createElement('br'));
}
window.ui_debugFlag_changed = ui_debugFlag_changed;
