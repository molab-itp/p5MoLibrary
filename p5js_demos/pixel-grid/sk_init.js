function my_init() {
  my.query = get_url_params();
  if (my.query) {
    my.guestName = my.query.g;
    my.hostName = my.query.h;
  }
  if (my.hostName) {
    my.draw_func = draw_host;
    my.width = displayWidth;
    my.height = displayHeight;
  } else {
    my.draw_func = draw_guest;
    my.width = my.vwidth;
    my.height = my.vheight;
  }
  my.layer = createGraphics(my.width, my.height);
  my.stepPx = floor(my.vwidth / my.nstep);
  my.innerPx = floor(my.stepPx * (1 - my.margin));
  my.crossWt = my.stepPx - my.innerPx;
  my.vx = 0;
  my.vy = 0;
  my.drawOps = [];
}

function ui_init() {
  if (!my.hostName) {
    create_myVideo();
  }

  createSpan('v' + my.version);

  my.resetBtn = createButton('Reset');
  my.resetBtn.mousePressed(reset_action);

  if (!my.hostName) {
    my.faceChk = createCheckbox('Face', my.face);
    my.faceChk.style('display:inline');
    my.faceChk.changed(faceChk_action);
  }

  my.runChk = createCheckbox('Run', my.run);
  my.runChk.style('display:inline');
  my.runChk.changed(function () {
    my.run = this.checked();
  });

  my.storeChk = createCheckbox('Store', my.store);
  my.storeChk.style('display:inline');
  my.storeChk.changed(function () {
    my.store = this.checked();
  });
}

function faceChk_action() {
  my.face = this.checked();
  my.facingMode = my.face ? 'user' : 'environment';
  console.log('my.facingMode', my.facingMode);
  my.video.remove();
  create_myVideo();
}

function reset_action() {
  location.reload();
}
function check_scroll() {
  if (my.scrolling) {
    window.scrollBy(0, 1);
  }
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
  ui_span('updateCount', ' uc:' + my.updateCount);
  ui_span('nitems', ' ni:' + my.nitems);
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
}

// return null or url query as object
// eg. query='abc=foo&def=%5Basf%5D&xyz=5'
// params={abc: "foo", def: "[asf]", xyz: "5"}
function get_url_params() {
  let query = window.location.search;
  // console.log('query |' + query + '|');
  console.log('query.length', query.length);
  if (query.length < 1) return null;
  let params = params_query(query);
  return params;
  // let store = params['store'];
  // console.log('nstore', store);
  // return store;
}

// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
function params_query(query) {
  // eg. query='abc=foo&def=%5Basf%5D&xyz=5'
  // params={abc: "foo", def: "[asf]", xyz: "5"}
  const urlParams = new URLSearchParams(query);
  const params = Object.fromEntries(urlParams);
  return params;
}
