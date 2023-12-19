//
function ui_log(my, ...args) {
  // if (! my.debugLog) return
  if (!my.logLines) {
    ui_log_init(my);
  }
  let key = args[0];
  let ent = ui_logTagEntry(key);
  ent.count++;
  if (ent.console) {
    console.log(...args);
  }
  if (ent.log) {
    my.logLines.push(args.join(' '));
    if (my.logLines.length > my.logLinesMax) {
      my.logLines.splice(0, 1);
    }
    my.logDiv.html(my.logLines.join('<br/>'));
  }
}
window.ui_log = ui_log;

function ui_logTagEntry(key) {
  let ent = my.logTags[key];
  if (!ent) {
    ent = { count: 0, console: 1, log: 1 };
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
function ui_span(my, id, html) {
  let span = select('#' + id);
  if (document.fullscreenElement) {
    if (span) {
      span.remove();
    }
    return;
  }
  if (!span) {
    span = createSpan().id(id);
  }
  span.html(html);
  return span;
}
window.ui_span = ui_span;

function ui_break(my) {
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

function ui_update_begin() {
  my.ui_id_index = 0;
}
window.ui_update_begin = ui_update_begin;
