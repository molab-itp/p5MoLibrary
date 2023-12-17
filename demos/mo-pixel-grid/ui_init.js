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
  if (!my.hostName) {
    create_myVideo();
  }

  my.verBtn = createButton('v' + my.version);
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

  if (!my.hostName) {
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
    dstore_signin_update();
    my.store = this.checked();
  });

  my.hostChk = createCheckbox('Host', my.host);
  my.hostChk.style('display:inline');
  my.hostChk.changed(function () {
    my.host = this.checked();
    init_host();
  });

  createElement('br');
}

function init_host() {
  console.log('init_host', my.host);
  my.draw_func = my.host ? draw_host : draw_guest;
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

function create_myVideo() {
  let options = { video: { facingMode: my.facingMode } };
  my.video = createCapture(options);
  my.video.size(my.vwidth, my.vheight);
  my.video.hide();
}

function video_ready() {
  return my.video.loadedmetadata && my.video.width > 0 && my.video.height > 0;
}

function ui_update() {
  ui_update_xy();
  ui_update_rgb();
  ui_break('break1');
  ui_update_info();
  my.ui_last = ui_break('break2');
}

function ui_update_xy() {
  let x = my.vx;
  let y = my.vy;
  let str = ` x: ${x} y: ${y}`;
  my.report = ui_span('report', str);
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

function ui_update_info() {
  // ui_span('updateCount', ' uc:' + my.updateCount);
  // ui_span('nitems', ' ni:' + my.nitems);
  if (my.guestName) {
    ui_span('guestName', ' guestName:' + my.guestName);
  }
  if (my.hostName) {
    ui_span('hostName', ' hostName:' + my.hostName);
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
