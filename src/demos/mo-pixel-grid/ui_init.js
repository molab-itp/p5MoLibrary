//
// my.canvas is create before ui_init call
//
function ui_init() {
  //
  ui_init_row_1();

  ui_init_row_2();

  ui_init_row_3();

  ui_init_debug_pane();

  ui_update();

  // Move the canvas below all the ui elements
  let body_elt = document.querySelector('body');
  let main_elt = document.querySelector('main');
  body_elt.insertBefore(main_elt, null);
}

function ui_init_row_1() {
  //
  my.versionBtn = createButton('v' + my.version.substring(2));
  my.versionBtn.mousePressed(function () {
    ui_toggle_scroll(my);
  });

  ui_nstep_selection();

  my.exposeChk = ui_createCheckbox('Expose', my.exposeFlag);
  my.exposeChk.changed(function () {
    exposeFlag_changed(this.checked());
  });

  ui_span('nagent', ' nagent:' + my.nagent);

  createElement('br');
}

function ui_init_row_2() {
  //
  my.debugChk = ui_createCheckbox('Debug', my.debugFlag);
  my.debugChk.changed(function () {
    debugFlag_changed(this.checked());
  });

  my.scrollFlagChk = ui_createCheckbox('Scroll', my.scrollFlag);
  my.scrollFlagChk.changed(function () {
    scrollFlag_changed(this.checked());
  });

  my.faceChk = ui_createCheckbox('Face', my.faceFlag);
  my.faceChk.changed(function () {
    faceFlag_changed(this.checked());
  });

  my.videoChk = ui_createCheckbox('Video', my.videoFlag);
  my.videoChk.changed(function () {
    videoFlag_changed(this.checked());
  });

  my.scanFlagChk = ui_createCheckbox('Scan', my.scanFlag);
  my.scanFlagChk.changed(function () {
    scanFlag_changed(this.checked());
  });

  my.storeFlagChk = ui_createCheckbox('Store', my.storeFlag);
  my.storeFlagChk.changed(function () {
    storeFlag_changed(this.checked());
  });

  createElement('br');
}

function ui_init_row_3() {
  //

  my.room_name_input = createInput('' + my.room_name)
    .id('id_room_name')
    .input(function () {
      // console.log('id_refIndex', this.value());
      my.room_name = this.value();
    });
  my.room_name_input.size(60);

  my.name_input = createInput('' + my.name)
    .id('id_name_input')
    .input(function () {
      // console.log('id_refIndex', this.value());
      my.name = this.value();
    });
  my.name_input.size(60);

  // my.nextBtn = createButton(' Next');
  // my.nextBtn.mousePressed(function () {
  //   debugNextAction();
  // });

  my.clearBtn = createButton(' Clear');
  my.clearBtn.mousePressed(function () {
    dstore_pix_remove();
    dstore_agent_remove();
    ui_log_clear(my);
  });

  my.reloadBtn = createButton('Update');
  my.reloadBtn.mousePressed(function () {
    location.reload();
  });

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
    nstep_changed(this.value());
  });
  my.nstep_selection = aSel;
}

function ui_update() {
  ui_update_begin();
  ui_span('nagent', ' nagent:' + my.nagent);
  // ui_update_sub_info();
  // ui_break(my);
  ui_update_names();
  ui_break(my);
  ui_update_xy();
  ui_update_rgb();
  my.ui_last = ui_break(my);
}

function ui_update_xy() {
  let x = my.track_xi * my.stepPx;
  let y = my.track_yi * my.stepPx;
  let str = ` x: ${x} y: ${y}`;
  my.report = ui_span('report', str);
}

// function ui_update_sub_info() {
//   let sub_name = '?';
//   if (my.stored_agent && my.agent_uid) {
//     let ent = my.stored_agent[my.agent_uid];
//     if (ent) {
//       sub_name = ent.name_s || sub_name;
//     }
//   }
//   let agent_uid = my.agent_uid || '?';
//   ui_span('sub_name', ' sub_name:' + sub_name);
//   ui_span('agent_uid', ' uid:' + agent_uid);
// }

function ui_update_rgb() {
  let colr = my.videoColor;
  if (!colr) colr = [0, 0, 0];

  let r = colr[0];
  let g = colr[1];
  let b = colr[2];

  let spanrgb = ui_span('rgb', ` &nbsp&nbsp&nbsp&nbsp`);
  if (!spanrgb) return;

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
  let name = my.name || '?';
  ui_span('name', ' name:' + name);
  let uid = my.uid || '?';
  ui_span('uid', ' uid:' + uid);
}

function ui_init_debug_pane() {
  my.debug_div = ui_div('debug', 'Welcome to the debug pane');
  if (!my.debugFlag) {
    my.debug_div.elt.classList.toggle('hidden');
  }
}

// --

function scanFlag_changed(newValue) {
  my.scanFlag = newValue;
  if (my.scanFlag) {
    my.animLoop.start();
  }
}

function videoFlag_changed(newValue) {
  my.videoFlag = newValue;
}

function scrollFlag_changed(newValue) {
  my.scrollFlag = newValue;
}

function exposeFlag_changed(newValue) {
  my.exposeFlag = newValue;
}

function nstep_changed(newValue) {
  my.nstep = parseFloat(newValue);
  console.log('ui_nstep_selection', my.nstep);
  init_nstep();
  my.layer.clear();
}

function storeFlag_changed(newValue) {
  my.storeFlag = newValue;
  // dstore_agent_update();
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

    let chk = ui_createCheckbox('console', ent.console);
    // chk.style('display:inline');
    chk.changed(function () {
      ent.console = this.checked();
    });

    let chk2 = ui_createCheckbox('log', ent.log);
    // chk2.style('display:inline');
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
