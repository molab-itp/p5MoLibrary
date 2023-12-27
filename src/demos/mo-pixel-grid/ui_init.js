//
// my.canvas is create before ui_init call
//
function ui_init() {
  //
  ui_begin();

  ui_init_row_1();

  my.container_div = ui_div(my, 'container', '');
  ui_set_hidden(my.container_div, my.settingsFlag);

  my.ui_container = my.container_div;

  ui_init_row_2();

  ui_init_row_3();

  ui_init_logSummary_div(my);

  ui_update();

  // Move the canvas below all the ui elements
  let body_elt = document.querySelector('body');
  let main_elt = document.querySelector('main');
  body_elt.insertBefore(main_elt, null);
}

function ui_init_row_1() {
  //
  my.versionBtn = ui_createButton(my, 'v' + my.version.substring(2));
  my.versionBtn.mousePressed(function () {
    ui_toggle_scroll(my);
  });

  my.settingsChk = ui_checkbox(my, 'Settings', my.settingsFlag);
  my.settingsChk.changed(function () {
    settingsFlag_changed(this.checked());
  });

  ui_span(my, 'ndevice', ' ndevice:' + my.ndevice);

  ui_break(my);
}

function ui_init_row_2() {
  //
  my.logSummaryChk = ui_checkbox(my, 'LogSummary', my.logSummaryFlag);
  my.logSummaryChk.changed(function () {
    ui_logSummaryFlag_changed(my, this.checked());
  });

  my.logDetailChk = ui_checkbox(my, 'LogDetail', my.logDetailFlag);
  my.logDetailChk.changed(function () {
    ui_logDetailFlag_changed(my, this.checked());
  });

  my.scrollFlagChk = ui_checkbox(my, 'Scroll', my.scrollFlag);
  my.scrollFlagChk.changed(function () {
    scrollFlag_changed(this.checked());
  });

  my.faceChk = ui_checkbox(my, 'Face', my.faceFlag);
  my.faceChk.changed(function () {
    faceFlag_changed(this.checked());
  });

  my.videoChk = ui_checkbox(my, 'Video', my.videoFlag);
  my.videoChk.changed(function () {
    videoFlag_changed(this.checked());
  });

  my.scanFlagChk = ui_checkbox(my, 'Scan', my.scanFlag);
  my.scanFlagChk.changed(function () {
    scanFlag_changed(this.checked());
  });

  my.storeFlagChk = ui_checkbox(my, 'Store', my.storeFlag);
  my.storeFlagChk.changed(function () {
    storeFlag_changed(this.checked());
  });

  ui_break(my);
}

function ui_init_row_3() {
  //
  my.roomName_input = ui_input(my, 'id_roomName_input', '' + my.roomName);
  my.roomName_input.input(function () {
    roomName_changed(this.value());
  });
  my.roomName_input.size(60);

  my.name_input = ui_input(my, 'id_name_input', '' + my.name);
  my.name_input.input(function () {
    name_changed(this.value());
  });
  my.name_input.size(60);

  ui_nstep_selection();

  my.updateBtn = ui_createButton(my, 'Update');
  my.updateBtn.mousePressed(updateBtn_action);

  my.resetBtn = ui_createButton(my, ' Reset');
  my.resetBtn.mousePressed(resetBtn_action);

  ui_break(my);
}

function ui_nstep_selection() {
  ui_span(my, 'nstep_label', ' nstep:');
  let aSel = ui_select(my, 'nstep_select');
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
  ui_span(my, 'ndevice', ' ndevice:' + my.ndevice);
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
  my.report = ui_span(my, 'report', str);
}

function ui_update_rgb() {
  let colr = my.videoColor;
  if (!colr) colr = [0, 0, 0];

  let r = colr[0];
  let g = colr[1];
  let b = colr[2];

  let spanrgb = ui_span(my, 'rgb', ` &nbsp&nbsp&nbsp&nbsp`);
  if (!spanrgb) return;

  let spanr = ui_span(my, 'r', ` r: ${r} &nbsp`);
  let spang = ui_span(my, 'g', ` g: ${g} &nbsp`);
  let spanb = ui_span(my, 'b', ` b: ${b} &nbsp`);

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
  // ui_span(my, 'name', ' name:' + name);
  let uid = my.uid || '?';
  ui_span(my, 'uid', ' uid:' + uid);
}

// --

function roomName_changed(newValue) {
  my.roomName = newValue;
}

function name_changed(newValue) {
  my.name = newValue;
}

function updateBtn_action() {
  localStore_set();
  // location.reload();
}

function resetBtn_action() {
  dstore_remove();
  ui_log_clear(my);
  localStorage.clear();
  location.reload();
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

function settingsFlag_changed(newValue) {
  my.settingsFlag = newValue;
  ui_set_hidden(my.container_div, my.settingsFlag);
}

function nstep_changed(newValue) {
  my.nstep = parseFloat(newValue);
  console.log('ui_nstep_selection', my.nstep);
  nstep_init();
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
