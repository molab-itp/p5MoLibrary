function ui_init() {
  createButton('Empty').mousePressed(gallery_empty);

  createButton('Trim').mousePressed(gallery_trim);

  createButton('Clear').mousePressed(function () {
    my.layer.clear();
  });

  my.gridChk = createCheckbox('Grid', my.drawGrid);
  my.gridChk.style('display:inline');
  my.gridChk.changed(function () {
    my.drawGrid = this.checked();
  });

  my.faceChk = createCheckbox('Face', my.face);
  my.faceChk.style('display:inline');
  my.faceChk.changed(faceChk_action);

  createElement('br');

  ui_update();
}

// check box action for front facing or back facing camera selection
function faceChk_action() {
  my.face = this.checked();
  my.facingMode = my.face ? 'user' : 'environment';
  console.log('my.facingMode', my.facingMode);
  my.video.remove();
  create_myVideo();
}

function ui_update() {
  ui_span('ver', '(' + my.version + ')');
  ui_span('updateCount', ' u:' + my.updateCount);
  ui_span('nitems', ' n:' + my.nitems);
}

function formatDate() {
  return new Date().toISOString();
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

// create the vidoe capture element based on my.facingMode
function create_myVideo() {
  let options = { video: { facingMode: my.facingMode } };
  my.video = createCapture(options);
  my.video.size(my.vwidth, my.vheight);
  my.video.hide();
}

// is the video ready to be displayed
function video_ready() {
  return my.video.loadedmetadata && my.video.width > 0 && my.video.height > 0;
}
