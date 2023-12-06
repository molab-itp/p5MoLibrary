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
  let slider = createSlider(1, 14, my.pane.zoomIndex, 0.01).input(function () {
    my.pane.pan_updateZoom(this.value());
  });
  slider.style('width:400px');
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
