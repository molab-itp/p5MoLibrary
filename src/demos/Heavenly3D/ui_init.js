//
function ui_init() {
  //
  createSpan().id('id_angleX');
  createSpan().id('id_angleY');
  createSpan().id('id_angleZ');
  createElement('br');
  createButton('up').mousePressed(function () {
    my.focusBody.setDir(dirUp);
  });
  createButton('down').mousePressed(function () {
    my.focusBody.setDir(dirDown);
  });
  createButton('left').mousePressed(function () {
    my.focusBody.setDir(dirLeft);
  });
  createButton('right').mousePressed(function () {
    my.focusBody.setDir(dirRight);
  });
  createButton('Zleft').mousePressed(function () {
    my.focusBody.setDir(dirZLeft);
  });
  createButton('Zright').mousePressed(function () {
    my.focusBody.setDir(dirZRight);
  });
  createButton('stop').mousePressed(function () {
    my.focusBody.setDir(dirStop);
  });
  createElement('br');
  createButton('zero').mousePressed(function () {
    my.focusBody.zero();
  });
  createButton('Africa').mousePressed(function () {
    my.focusBody.setAngle(0, 2.8, 0); // Africa
  });
  createButton('USA').mousePressed(function () {
    my.focusBody.setAngle(-0.567, 5.0, 0); // USA
  });
  createButton('Antarctica').mousePressed(function () {
    my.focusBody.setAngle(1.5, 0.0, 0); // Antarctica
  });
  createButton('North Pole').mousePressed(function () {
    my.focusBody.setAngle(-1.5, 0.0, 0); // North Pole
  });
  createElement('br');
  createButton('next img').mousePressed(function () {
    nextBackgImg();
  });
  let panScaleSlider = createSlider(1, 32, my.panScale, 0.01);
  panScaleSlider.input(function () {
    my.panScale = parseFloat(this.value());
  });
  panScaleSlider.style('width:300px');
}

function ui_init_update() {
  //
  let focus = my.focusBody;
  if (!focus) return;

  let angleX = focus.angleX.toFixed(4);
  select('#id_angleX').html('[angleX=' + angleX + '] ');

  let angleY = focus.angleY.toFixed(4);
  select('#id_angleY').html('[angleY=' + angleY + '] ');

  let angleZ = focus.angleZ.toFixed(4);
  select('#id_angleZ').html('[angleZ=' + angleZ + '] ');
}

// https://editor.p5js.org/jht9629-nyu/sketches/rXhPgZ1k6
// 2.2.3 circleX width ui
// reporting variable values, cooridinates and colors
