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
    my.zoom_slider = createSlider(1, 16, my.pane.zoomIndex, 0.01).input(function () {
      clearLastMouseEnts();
      my.pane.pan_updateZoom(this.value());
    });
    my.zoom_slider.style('width:500px');
  }
  createElement('br');
  {
    my.paneLabel = createSpan().id('id_paneLabel');
    my.paneLabel.html(my.pane.label);
  }
  {
    my.refIndex_input = createInput('' + (my.pane.refIndex + 1))
      .id('id_refIndex')
      .input(function () {
        console.log('id_refIndex', this.value());
        my.pane.refIndex = parseFloat(this.value()) - 1;
      });
    my.refIndex_input.size(30);
  }
  createButton('<•').mousePressed(function () {
    previousRefAction();
  });
  createButton('•>').mousePressed(function () {
    nextRefAction();
  });
  createButton('focus').mousePressed(function () {
    focusAction();
  });
  {
    my.refLabel_input = createInput('' + my.pane.refLabel)
      .id('id_refLabel')
      .input(function () {
        // console.log('id_refLabel ' + this.value());
        my.pane.refLabel = this.value();
      });
    my.refLabel_input.size(180);
  }
  createButton('update').mousePressed(function () {
    updateAction();
  });
  createButton('dump').mousePressed(function () {
    dumpAction();
  });
  {
    my.refEntryReport_div = createDiv().id('id_ptsReport');
  }
}

function dumpAction() {
  let str = 'let pane1 = ' + JSON.stringify(my.pane1.refBox, undefined, 2);
  let str2 = 'let pane2 = ' + JSON.stringify(my.pane2.refBox, undefined, 2);
  str += '\n' + str2;
  download('panes.js', str);
}

function focusAction() {
  clearLastMouseEnts();
  my.pane1.focus();
  my.pane2.focus();
}

function updateAction() {
  my.pane.updateRefEntry(my.lastMouseEnts);
  ui_refEntryUpdate();
}

function ui_refEntryUpdate() {
  let refEntry = my.pane.refEntry();
  let str = '';
  if (refEntry) {
    // refEntry.label = my.refLabel_input.value();
    str = JSON.stringify(refEntry);
  }
  my.refEntryReport_div.html(str);
}

function setPane(nPane) {
  my.pane = nPane;
  my.refIndex_input.value(my.pane.refIndex + 1);
  my.paneLabel.html(my.pane.label);
  my.zoom_slider.value(my.pane.zoomIndex);
  my.refLabel_input.value(my.pane.refLabel);
}

function previousRefAction() {
  if (my.pane.refIndex == 0) {
    // Wrap around to top
    refAdjustDelta(my.pane1.refBox.refs.length - 1);
  } else {
    refAdjustDelta(-1);
  }
}

function nextRefAction() {
  refAdjustDelta(1);
}

function refAdjustDelta(delta) {
  my.pane1.refIndex += delta;
  my.pane2.refIndex += delta;
  my.refIndex_input.value(my.pane.refIndex + 1);
  my.refLabel_input.value(my.pane.refLabel);
  ui_refEntryUpdate();

  if (my.pane1.refLabel && my.pane2.refLabel) {
    focusAction();
  }
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

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
