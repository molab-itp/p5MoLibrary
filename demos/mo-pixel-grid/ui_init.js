//
// my.canvas is create before ui_init call
//
function ui_init() {
  //
  ui_init_control_1();

  ui_init_debug_pane();

  ui_init_control_2();

  ui_update();

  // Move the canvas below all the ui elements
  let belt = document.querySelector('body');
  let melt = document.querySelector('main');
  belt.insertBefore(melt, null);
}

function ui_init_control_1() {
  //
  video_create(my);

  my.versionBtn = createButton('v' + my.version.substring(2));
  my.versionBtn.mousePressed(function () {
    ui_toggle_scroll(my);
  });

  my.reloadBtn = createButton('Reload');
  my.reloadBtn.mousePressed(function () {
    location.reload();
  });

  ui_nstep_selection();
  // ui_perFrame_selection();

  my.debugChk = createCheckbox('Debug', my.debugFlag);
  my.debugChk.style('display:inline');
  my.debugChk.changed(function () {
    debugFlag_changed(this.checked());
  });

  my.nextBtn = createButton(' Next');
  my.nextBtn.mousePressed(function () {
    debugNextAction();
  });

  my.clearBtn = createButton(' Clear');
  my.clearBtn.mousePressed(function () {
    ui_log_clear(my);
  });

  createElement('br');
}

function ui_init_control_2() {
  //
  my.faceChk = createCheckbox('Face', my.faceFlag);
  my.faceChk.style('display:inline');
  my.faceChk.changed(function () {
    faceFlag_changed(this.checked());
  });

  my.videoChk = createCheckbox('Video', my.videoFlag);
  my.videoChk.style('display:inline');
  my.videoChk.changed(function () {
    my.videoFlag = this.checked();
  });

  my.runFlagChk = createCheckbox('Run', my.runFlag);
  my.runFlagChk.style('display:inline');
  my.runFlagChk.changed(function () {
    my.runFlag = this.checked();
  });

  my.storeFlagChk = createCheckbox('Store', my.storeFlag);
  my.storeFlagChk.style('display:inline');
  my.storeFlagChk.changed(function () {
    storeFlag_changed(this.checked());
  });

  ui_span('nlobby', ' nlobby:' + my.nlobby);

  createElement('br');
}

function ui_nstep_selection() {
  createSpan(' nstep:');
  let aSel = createSelect();
  let opts = [8, 16, 32, 64, 128, 4, 2, 1];
  // !!@ mstep set to 8 but 16 sometimes taking effect in db update
  // let my = { nstep: 8,
  // let opts = [16, 32, 64, 128, 8, 4, 2, 1];
  for (let ent of opts) {
    aSel.option(ent, ent);
  }
  aSel.selected(my.nstep);
  aSel.changed(function () {
    nstep_changed(this.checked());
  });
  my.nstep_selection = aSel;
}

function ui_update() {
  ui_update_begin();
  ui_span('nlobby', ' nlobby:' + my.nlobby);
  ui_update_sub_info();
  ui_break(my);
  ui_update_xy();
  ui_update_rgb();
  ui_break(my);
  ui_update_names();
  my.ui_last = ui_break(my);
}

function ui_update_xy() {
  let x = my.vx;
  let y = my.vy;
  let str = ` x: ${x} y: ${y}`;
  my.report = ui_span('report', str);
}

function ui_update_sub_info() {
  let sub_name = '?';
  if (my.stored_lobby && my.sub_uid) {
    let ent = my.stored_lobby[my.sub_uid];
    if (ent) {
      sub_name = ent.name_s || sub_name;
    }
  }
  let sub_uid = my.sub_uid || '?';
  ui_span('sub_name', ' sub_name:' + sub_name);
  ui_span('sub_uid', ' uid:' + sub_uid);
}

function ui_update_rgb() {
  let colr = my.videoColor;
  if (!colr) colr = [0, 0, 0];

  let r = colr[0];
  let g = colr[1];
  let b = colr[2];

  let spanrgb = ui_span('rgb', ` &nbsp&nbsp&nbsp&nbsp`);
  let spanr = ui_span('r', ` r: ${r} &nbsp`);
  let spang = ui_span('g', ` g: ${g} &nbsp`);
  let spanb = ui_span('b', ` b: ${b} &nbsp`);

  spanrgb.elt.style.backgroundColor = `rgb(${r},${g},${b})`;
  spanr.elt.style.backgroundColor = `rgb(${r},0,0)`;
  spang.elt.style.backgroundColor = `rgb(0,${g},0)`;
  spanb.elt.style.backgroundColor = `rgb(0,0,${b})`;

  spanr.elt.style.color = 'white';
  spang.elt.style.color = 'white';
  spanb.elt.style.color = 'white';
}

function ui_update_names() {
  if (my.name) {
    ui_span('name', ' name:' + my.name);
  }
  if (my.uid) {
    ui_span('uid', ' uid:' + my.uid);
  }
}

function ui_init_debug_pane() {
  my.debug_div = ui_div('debug', 'Welcome to the debug pane');
  if (!my.debugFlag) {
    my.debug_div.elt.classList.toggle('hidden');
  }
}

// --

function debugNextAction() {
  dstore_nextPixs();
}

function nstep_changed(newValue) {
  my.nstep = parseFloat(newValue);
  console.log('ui_nstep_selection', my.nstep);
  init_nstep();
  my.layer.clear();
}

function storeFlag_changed(newValue) {
  my.storeFlag = newValue;
  // dstore_lobby_update();
  // video_create(my);
}

function faceFlag_changed(newValue) {
  my.faceFlag = newValue;
  my.facingMode = my.faceFlag ? 'user' : 'environment';
  console.log('my.facingMode', my.facingMode);
  video_create(my);
}

function debugFlag_changed(newValue) {
  my.debugFlag = newValue;
  my.debug_div.elt.classList.toggle('hidden');
  // console.log('my.logTags', my.logTags);
  if (!my.logTags) return;
  let div = ui_div_empty('debug');
  for (let key in my.logTags) {
    let ent = my.logTags[key];
    // console.log('my.logTags key=', key, 'ent', ent);
    let span = createSpan(key);

    let chk = createCheckbox('console', ent.console);
    chk.style('display:inline');
    chk.changed(function () {
      ent.console = this.checked();
    });

    let chk2 = createCheckbox('log', ent.log);
    chk2.style('display:inline');
    chk2.changed(function () {
      ent.log = this.checked();
    });

    let spanCount = createSpan(' count=' + ent.count);

    div.child(createElement('br'));
    div.child(span);
    div.child(chk);
    div.child(chk2);
    div.child(spanCount);

    div.child(createElement('br'));
  }
  div.child(createElement('br'));
}
