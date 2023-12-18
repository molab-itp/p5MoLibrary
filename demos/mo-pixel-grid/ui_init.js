//
// my.canvas is create before ui_init call
//
function ui_init() {
  ui_init_controls();

  ui_update();

  // Move the canvas below all the ui elements
  let belt = document.querySelector('body');
  let melt = document.querySelector('main');
  belt.insertBefore(melt, null);
}

function ui_init_controls() {
  if (!my.subscribeName) {
    create_myVideo();
  }

  my.verBtn = createButton('v' + my.version.substring(2));
  my.verBtn.mousePressed(function () {
    ui_toggle_scroll();
  });

  my.reloadBtn = createButton('Reload');
  my.reloadBtn.mousePressed(function () {
    location.reload();
  });

  ui_nstep_selection();
  // ui_perFrame_selection();

  createElement('br');

  if (!my.subscribeName) {
    my.faceChk = createCheckbox('Face', my.face);
    my.faceChk.style('display:inline');
    my.faceChk.changed(faceChk_action);
  }

  my.videoChk = createCheckbox('Video', my.showVideo);
  my.videoChk.style('display:inline');
  my.videoChk.changed(function () {
    my.showVideo = this.checked();
  });

  my.runChk = createCheckbox('Run', my.run);
  my.runChk.style('display:inline');
  my.runChk.changed(function () {
    my.run = this.checked();
  });

  my.storeChk = createCheckbox('Store', my.store);
  my.storeChk.style('display:inline');
  my.storeChk.changed(function () {
    dstore_active_update();
    my.store = this.checked();
  });

  my.subscribeChk = createCheckbox('Subcribe', my.subscribe);
  my.subscribeChk.style('display:inline');
  my.subscribeChk.changed(function () {
    my.subscribe = this.checked();
    init_subscribe();
  });

  ui_span('nlog', ' nlog:' + my.nlog);

  createElement('br');
}

function init_subscribe() {
  console.log('init_subscribe', my.subscribe);
  my.draw_func = my.subscribe ? draw_subscribe : draw_publish;
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
    my.nstep = parseFloat(this.value());
    console.log('ui_nstep_selection', my.nstep);
    init_nstep();
    my.layer.clear();
  });
}

function faceChk_action() {
  my.face = this.checked();
  my.facingMode = my.face ? 'user' : 'environment';
  console.log('my.facingMode', my.facingMode);
  my.video.remove();
  create_myVideo();
}

// !!@ Move to lib
function create_myVideo() {
  let options = { video: { facingMode: my.facingMode } };
  my.video = createCapture(options);
  my.video.size(my.vwidth, my.vheight);
  my.video.hide();
}
// !!@ Move to lib
function video_ready() {
  return my.video.loadedmetadata && my.video.width > 0 && my.video.height > 0;
}

function ui_update() {
  //
  ui_span('nlog', ' nlog:' + my.nlog);

  if (my.subscribeName) {
    ui_update_pub_info();
  } else {
    ui_update_xy();
    ui_update_rgb();
  }
  ui_break('break1');
  ui_update_names();
  my.ui_last = ui_break('break2');
}

function ui_update_xy() {
  let x = my.vx;
  let y = my.vy;
  let str = ` x: ${x} y: ${y}`;
  my.report = ui_span('report', str);
}

function ui_update_pub_info() {
  if (my.store_log) {
    let ent = my.store_log[my.pub_uid];
    // console.log('ui_update_pub_info ent', ent);
    my.pub_name = '?';
    if (ent) {
      my.pub_name = ent.name_s;
    }
  }
  ui_span('pub_name', ' pub_name:' + my.pub_name);
  ui_span('pub_uid', ' pub_uid:' + my.pub_uid);
}

function ui_update_rgb() {
  let r = my.colr[0];
  let g = my.colr[1];
  let b = my.colr[2];

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
  if (my.publishName) {
    ui_span('publishName', ' publishName:' + my.publishName);
  }
  if (my.subscribeName) {
    ui_span('subscribeName', ' subscribeName:' + my.subscribeName);
  }
  if (my.uid) {
    ui_span('uid', ' uid:' + my.uid);
  }
}

function ui_break(id) {
  let elm = select('#' + id);
  if (!elm) {
    elm = createElement('br').id(id);
  }
  return elm;
}

function ui_span(id, html) {
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

function ui_toggle_scroll() {
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

function check_scroll() {
  if (my.scrolling) {
    window.scrollBy(0, 1);
  }
}
