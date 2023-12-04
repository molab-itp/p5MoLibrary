//
function ui_create() {
  //
  createButton('up').mousePressed(function () {
    my.earth.setDir(dirUp);
  });
  createButton('down').mousePressed(function () {
    my.earth.setDir(dirDown);
  });
  createButton('left').mousePressed(function () {
    my.earth.setDir(dirLeft);
  });
  createButton('right').mousePressed(function () {
    my.earth.setDir(dirRight);
  });
  createButton('Zleft').mousePressed(function () {
    my.earth.setDir(dirZLeft);
  });
  createButton('Zright').mousePressed(function () {
    my.earth.setDir(dirZRight);
  });
  createButton('stop').mousePressed(function () {
    my.earth.setDir(dirStop);
  });
  createButton('zero').mousePressed(function () {
    my.earth.zero();
  });
  createButton('Africa').mousePressed(function () {
    my.earth.setAngle(0, 2.8, 0); // Africa
  });
  createButton('USA').mousePressed(function () {
    my.earth.setAngle(-0.567, 5.0, 0); // USA
  });
  createButton('Antarctica').mousePressed(function () {
    my.earth.setAngle(1.5, 0.0, 0); // Antarctica
  });
  createButton('North Pole').mousePressed(function () {
    my.earth.setAngle(-1.5, 0.0, 0); // North Pole
  });
  createSpan().id('id_angleX');
  createSpan().id('id_angleY');
  createSpan().id('id_angleZ');
}

function ui_update() {
  //
  if (!select('#id_angleX')) return;

  let angleX = my.earth.angleX.toFixed(4);
  select('#id_angleX').html('[angleX=' + angleX + '] ');

  let angleY = my.earth.angleY.toFixed(4);
  select('#id_angleY').html('[angleY=' + angleY + '] ');

  let angleZ = my.earth.angleZ.toFixed(4);
  select('#id_angleZ').html('[angleZ=' + angleZ + '] ');
}

// https://editor.p5js.org/jht9629-nyu/sketches/rXhPgZ1k6
// 2.2.3 circleX width ui
// reporting variable values, cooridinates and colors
