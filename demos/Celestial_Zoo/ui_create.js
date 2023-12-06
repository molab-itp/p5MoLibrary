//
function ui_create() {
  //
  createSpan().id('id_panX');
  createSpan().id('id_panY');
  createSpan().id('id_scale');
  createElement('br');
  createButton('zero').mousePressed(function () {
    init_pan();
  });
  createButton('backg').mousePressed(function () {
    nextBackgImg();
  });
}

// my.panX = 0;
// my.panXStep = 1;
// my.panY = 0;
// my.panYStep = 1;
// my.scale = 8;

function ui_update() {
  //
  if (!ui_present()) return;

  let panX = my.panX.toFixed(4);
  select('#id_panX').html('[panX=' + panX + '] ');

  let panY = my.panY.toFixed(4);
  select('#id_panY').html('[panY=' + panY + '] ');

  let scale = my.scale.toFixed(4);
  select('#id_scale').html('[scale=' + scale + '] ');
}

function ui_present() {
  return select('#id_panX');
}

// https://editor.p5js.org/jht9629-nyu/sketches/rXhPgZ1k6
// 2.2.3 circleX width ui
// reporting variable values, cooridinates and colors
