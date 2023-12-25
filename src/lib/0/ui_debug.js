//

function ui_init_debug_pane(my) {
  my.debug_div = ui_div(my, 'debug', 'Welcome to the debug pane');
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
  let div = ui_div_empty(my, 'debug');
  for (let key in my.logTags) {
    let ent = my.logTags[key];
    // console.log('my.logTags key=', key, 'ent', ent);

    let span = createSpan(key);

    let chk = createCheckbox('console', ent.console);
    chk.style('display:inline');
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
