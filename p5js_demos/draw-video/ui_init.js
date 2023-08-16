function ui_init() {
  createButton('Empty').mousePressed(gallery_empty);

  createButton('Trim').mousePressed(gallery_trim);

  my.faceChk = createCheckbox('Face', my.face);
  my.faceChk.style('display:inline');
  my.faceChk.changed(faceChk_action);

  createButton('Clear').mousePressed(function () {
    my.layer.clear();
  });

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
