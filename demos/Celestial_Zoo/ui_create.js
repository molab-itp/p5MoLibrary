//
function ui_create() {
  //
  createSpan().id('id_panX');
  createSpan().id('id_panY');
  createSpan().id('id_zoom');
  createElement('br');
  createButton('zero').mousePressed(function () {
    my.pane.pan_init();
  });
  createButton('center').mousePressed(function () {
    my.pane.pan_center();
  });
  createButton('clear').mousePressed(function () {
    clearLastMouseEnts();
  });
  {
    my.zoom_slider = createSlider(1, 32, my.pane.zoomIndex, 0.01).input(function () {
      clearLastMouseEnts();
      my.pane.pan_updateZoom(this.value());
    });
    my.zoom_slider.style('width:500px');
  }
  createElement('br');
  {
    my.refIndex_input = createInput('' + (my.refBox.refIndex + 1))
      .id('id_refIndex')
      .input(function () {
        // console.log('id_refIndex', this.value());
        my.refBox.refIndex = parseFloat(this.value()) - 1;
      });
    my.refIndex_input.size(30);
  }
  createButton('Add').mousePressed(function () {
    addAction();
  });
  createButton('←').mousePressed(function () {
    previousRefAction();
  });
  createButton('→').mousePressed(function () {
    nextRefAction();
  });
  createButton('focus').mousePressed(function () {
    focusAction();
  });
  createButton('update').mousePressed(function () {
    updateAction();
  });
  {
    my.refLabel_input = createInput('' + my.refBox.refLabel)
      .id('id_refLabel')
      .input(function () {
        // console.log('id_refLabel ' + this.value());
        my.refBox.refLabel = this.value();
      });
    my.refLabel_input.size(180);
  }
  createButton('download').mousePressed(function () {
    downloadAction();
  });
  {
    my.refEntryReport_div = createDiv().id('id_ptsReport');
  }
}

function addAction() {
  let n = my.refBox.refs.length;
  my.refBox.refIndex = n;
  my.refIndex_input.value(my.refBox.refIndex + 1);
  my.refLabel_input.value(my.refBox.refLabel);
  ui_paneUpdate();
}

function downloadAction() {
  // !!@ JSON.stringify refBox
  let str = 'let refBox_init = ' + JSON.stringify(my.refBox, undefined, 2);
  downloadToFile('refBox_init.js', str);
}

function focusAction() {
  clearLastMouseEnts();
  my.pane1.focus();
  my.pane0.focus();
}

function updateAction() {
  my.pane.updateRefEntry(my.lastMouseEnts);
  ui_paneUpdate();
}

function setPane(nPane) {
  my.pane = nPane;
  ui_paneUpdate();
}

function ui_paneUpdate() {
  let pt = my.pane.pt();
  let str = '';
  str = my.pane.label + ' ' + JSON.stringify(pt);
  my.refEntryReport_div.html(str);
  my.zoom_slider.value(my.pane.zoomIndex);
}

function previousRefAction() {
  if (my.refBox.refIndex == 0) {
    // Wrap around to top
    refAdjustTo(my.refBox.refs.length - 1);
  } else {
    refAdjustDelta(-1);
  }
}

function nextRefAction() {
  let n = my.refBox.refs.length - 1;
  if (my.refBox.refIndex == n) {
    // Wrap around to botom
    refAdjustTo(0);
  } else {
    refAdjustDelta(1);
  }
}

function refAdjustTo(index) {
  my.refBox.refIndex = index;
  syncRefIndex();
}

function syncRefIndex() {
  my.refIndex_input.value(my.refBox.refIndex + 1);
  my.refLabel_input.value(my.refBox.refLabel);
  ui_paneUpdate();
  if (my.pane0.pt().z && my.pane1.pt().z) {
    focusAction();
  }
}

function refAdjustDelta(delta) {
  my.refBox.refIndex += delta;
  syncRefIndex();
}

function ui_update() {
  //
  if (!ui_present()) return;
  let pane = my.pane;

  let panX = pane.panX.toFixed(1);
  select('#id_panX').html('[panX=' + panX + '] ');

  let panY = pane.panY.toFixed(1);
  select('#id_panY').html('[panY=' + panY + '] ');

  let zoom = pane.zoomIndex.toFixed(2);
  select('#id_zoom').html('[zoom=' + zoom + '] ');
}

function ui_present() {
  return select('#id_panX');
}

// https://editor.p5js.org/jht9629-nyu/sketches/bG2JhGUBX
// 3.5 circleX ui span buttons slider checkbox

// https://editor.p5js.org/jht9629-nyu/sketches/rXhPgZ1k6
// 2.2.3 circleX ui span coordinates xy colors rgb
// reporting variable values, coorindates and colors

// https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
function downloadToFile(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// https://unicode.org/charts/nameslist/n_2190.html
