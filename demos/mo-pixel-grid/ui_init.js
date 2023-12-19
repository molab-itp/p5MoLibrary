//
// my.canvas is create before ui_init call
//
function ui_init() {
  //
  ui_init_control_1();

  ui_init_control_2();

  ui_update();

  // Move the canvas below all the ui elements
  let belt = document.querySelector('body');
  let melt = document.querySelector('main');
  belt.insertBefore(melt, null);
}

function ui_init_control_1() {
  create_myVideo(my);

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
  my.debugChk.changed(debugFlagChk_action);

  my.nextBtn = createButton(' Next');
  my.nextBtn.mousePressed(function () {
    debugNextAction();
  });

  createElement('br');
}

function ui_init_control_2() {
  if (my.storeFlag) {
    my.faceChk = createCheckbox('Face', my.faceFlag);
    my.faceChk.style('display:inline');
    my.faceChk.changed(faceFlagChk_action);
  }

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
  my.storeFlagChk.changed(storeFlagChk_action);

  // my.subscribeChk = createCheckbox('Subcribe', my.subscribe);
  // my.subscribeChk.style('display:inline');
  // my.subscribeChk.changed(function () {
  //   my.subscribe = this.checked();
  //   init_subscribe();
  // });

  ui_span(my, 'nlog', ' nlog:' + my.nlog);

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
  aSel.changed(nstep_updateAction);
}

function ui_update() {
  ui_update_begin();
  ui_span(my, 'nlog', ' nlog:' + my.nlog);
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
  my.report = ui_span(my, 'report', str);
}

function ui_update_sub_info() {
  let sub_name = '?';
  if (my.stored_lobby && my.sub_uid) {
    let ent = my.stored_lobby[my.sub_uid];
    if (ent) {
      sub_name = ent.name_s || sub_name;
    }
  }
  ui_span(my, 'sub_name', ' sub_name:' + sub_name);
  ui_span(my, 'sub_uid', ' uid:' + my.sub_uid);
}

function ui_update_rgb() {
  if (!my.videoColor) return;

  let r = my.videoColor[0];
  let g = my.videoColor[1];
  let b = my.videoColor[2];

  let spanrgb = ui_span(my, 'rgb', ` &nbsp&nbsp&nbsp&nbsp`);
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
  if (my.name) {
    ui_span(my, 'name', ' name:' + my.name);
  }
  if (my.uid) {
    ui_span(my, 'uid', ' uid:' + my.uid);
  }
}

// --

function nstep_updateAction() {
  my.nstep = parseFloat(this.value());
  console.log('ui_nstep_selection', my.nstep);
  init_nstep();
  my.layer.clear();
}

function debugNextAction() {
  //
}

function storeFlagChk_action() {
  my.storeFlag = this.checked();
  dstore_lobby_update();
  create_myVideo(my);
}

function faceFlagChk_action() {
  my.faceFlag = this.checked();
  my.facingMode = my.faceFlag ? 'user' : 'environment';
  console.log('my.facingMode', my.facingMode);
  create_myVideo(my);
}

function debugFlagChk_action() {
  my.debugFlag = this.checked();
  // console.log('my.logTags', my.logTags);
  if (!my.logTags) return;
  for (let key in my.logTags) {
    let ent = my.logTags[key];
    console.log('my.logTags key=', key, 'ent', ent);
  }
}
