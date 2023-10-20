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

  my.verBtn = createButton(my.version.substring(1));
  my.verBtn.mousePressed(function () {
    // ui_toggle_scroll();
  });

  createButton('SignIn').mousePressed(function () {
    fb_signIn();
  });

  createButton('List').mousePressed(function () {
    fstore_list(my.rootPath);
    // fstore_list('');
    // fstore_list('oVFxc052pOWF5qq560qMuBmEsbr2');
  });

  createButton('Download').mousePressed(function () {
    // fstore_getDownloadURL('oVFxc052pOWF5qq560qMuBmEsbr2/129.jpeg');
    // fstore_getDownloadURL('/-mo-1-@w-/mY5kp2xDNRWJG7dYAWXOFfwIwZD3/001');
    // fstore_getDownloadURL('-mo-1-@w-/y29ShmiYYNST4KUKK7G76db6k4H2/001.png');
    // -mo-1-@w-/y29ShmiYYNST4KUKK7G76db6k4H2
    fstore_getDownloadURL();
  });

  createButton('Upload').mousePressed(function () {
    fstore_upload();
  });

  my.reloadBtn = createButton('Reload');
  my.reloadBtn.mousePressed(function () {
    location.reload();
  });

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
  // console.log('init_host', my.host);
  my.draw_func = my.host ? draw_host : draw_guest;
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
  ui_update_info();
  my.ui_last = ui_break('break1');
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
