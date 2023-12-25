//
// my.canvas is create before ui_init call
//
function ui_init() {
  //
  ui_init_row_1();

  ui_init_row_2();

  ui_init_row_3();

  ui_init_debug_pane(my);

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

  my.exposeChk = ui_createCheckbox('Expose', my.exposeFlag);
  my.exposeChk.changed(function () {
    exposeFlag_changed(this.checked());
  });

  ui_span('ndevice', ' ndevice:' + my.ndevice);

  createElement('br');
}

function ui_init_row_2() {
  //
  my.debugChk = ui_createCheckbox('Debug', my.debugFlag);
  my.debugChk.changed(function () {
    ui_debugFlag_changed(my, this.checked());
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
      my.room_name = this.value();
    });
  my.room_name_input.size(60);

  my.name_input = createInput('' + my.name)
    .id('id_name_input')
    .input(function () {
      my.name = this.value();
    });
  my.name_input.size(60);

  ui_nstep_selection();

  my.updateBtn = createButton('Update');
  my.updateBtn.mousePressed(function () {
    updateBtn_action();
  });

  my.clearBtn = createButton(' Clear');
  my.clearBtn.mousePressed(clearBtn_action);

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
  ui_span('ndevice', ' ndevice:' + my.ndevice);
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
  // let name = my.name || '?';
  // ui_span('name', ' name:' + name);
  let uid = my.uid || '?';
  ui_span('uid', ' uid:' + uid);
}

// --

function updateBtn_action() {
  location.reload();
}

function clearBtn_action() {
  dstore_clear();
  ui_log_clear(my);
}

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
  // dstore_device_update();
  // video_create(my);
}

function faceFlag_changed(newValue) {
  my.faceFlag = newValue;
  my.facingMode = my.faceFlag ? 'user' : 'environment';
  console.log('my.facingMode', my.facingMode);
  video_create(my);
}
