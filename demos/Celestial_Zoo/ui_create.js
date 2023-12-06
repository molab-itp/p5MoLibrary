//
function ui_create() {
  //
  createSpan().id('id_panX');
  createSpan().id('id_panY');
  createSpan().id('id_zoom');
  createElement('br');
  createButton('zero').mousePressed(function () {
    pan_init();
  });
  createButton('center').mousePressed(function () {
    pan_center();
  });
  // createButton('backg').mousePressed(function () {
  //   nextBackgImg();
  // });
  createSlider(1, 14, my.zoomIndex, 0.01).input(function () {
    pan_updateZoom(this.value());
  });
}

function ui_update() {
  //
  if (!ui_present()) return;

  let panX = my.panX.toFixed(1);
  select('#id_panX').html('[panX=' + panX + '] ');

  let panY = my.panY.toFixed(1);
  select('#id_panY').html('[panY=' + panY + '] ');

  let zoom = my.zoomIndex.toFixed(1);
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
