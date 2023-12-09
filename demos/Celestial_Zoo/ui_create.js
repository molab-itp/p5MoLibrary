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
  {
    my.zoom_slider = createSlider(1, 14, my.pane.zoomIndex, 0.01).input(function () {
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
    my.refIndex_input = createInput('' + my.pane.refIndex)
      .id('id_refIndex')
      .input(function () {
        console.log('id_refIndex' + this.value());
        my.pane.refIndex = parseFloat(this.value());
      });
    my.refIndex_input.size(30);
  }
  createButton('<•').mousePressed(function () {
    previousRefAction();
  });
  createButton('•>').mousePressed(function () {
    nextRefAction();
  });
  {
    my.refLabel_input = createInput('' + my.pane.refLabel)
      .id('id_refLabel')
      .input(function () {
        // console.log('id_refLabel ' + this.value());
        my.pane.refLabel = this.value();
      });
    my.refLabel_input.size(60);
  }
  createButton('update').mousePressed(function () {
    updateAction();
  });
  createButton('clear').mousePressed(function () {
    my.lastPressedX = undefined;
    my.lastReleasedX = undefined;
  });
  createButton('restore').mousePressed(function () {
    restoreAction();
  });
  {
    my.refEntryReport_div = createDiv().id('id_ptsReport');
  }
}

function updateAction() {
  my.pane.updateRefEntry(my.lastMouseEnts);
  ui_refEntryUpdate();
}

function ui_refEntryUpdate() {
  let refEntry = my.pane.refs[my.pane.refIndex];
  let str = '';
  if (refEntry) {
    refEntry.label = my.refLabel_input.value();
    str = JSON.stringify(refEntry);
  }
  my.refEntryReport_div.html(str);
}

function setPane(nPane) {
  my.pane = nPane;
  my.refIndex_input.value(my.pane.refIndex);
  my.paneLabel.html(my.pane.label);
  my.zoom_slider.value(my.pane.zoomIndex);
  my.refLabel_input.value(my.pane.refLabel);
}

function previousRefAction() {
  refAdjustDelta(-1);
}

function nextRefAction() {
  refAdjustDelta(1);
}

function refAdjustDelta(delta) {
  my.pane.refIndex += delta;
  my.refIndex_input.value(my.pane.refIndex);
  ui_refEntryUpdate();
}

function restoreAction() {
  //
}

// function addAction() {
//   //
// }

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
