// https://editor.p5js.org/jht9629-nyu/sketches
// https://github.com/molab-itp/98-MoGallery-p5js/tree/main/demos/Celestial_Zoo
// Celestial_Zoo

let my = {};

function preload() {
  //
  my.backgImg = loadImage('../PlanetEarth/assets/The_Celestial_Zoo.png');
}

function setup() {
  //
  my.canvas = createCanvas(windowWidth, windowHeight - 90);
  my.canvas.mousePressed(canvas_mousePressed);
  my.canvas.mouseReleased(canvas_mouseReleased);
  my.width = width;
  my.height = height;
  my.paneRatio = 12 / 16;

  my.refBox = new RefBox(refBox_init);

  create_pane0();

  create_pane1();

  my.pane = my.pane1;

  ui_create();

  focusAction();
  // clearLastMouseEnts();
}

function draw() {
  //
  background(0);
  my.pane0.render();
  my.pane1.render();
  ui_update();
  if (my.mouseTracking) {
    my.pane.mouseDragged();
  }
  draw_crossHairs();
}

function clearLastMouseEnts() {
  my.lastMouseEnts = [];
  my.lastMouseIndex = 0;
}

function create_pane0() {
  let fwidth = my.width;
  let height = my.height;
  let backgImg = my.backgImg;
  let rr = 1 - my.paneRatio;
  let x0 = 0;
  let y0 = 0;
  let z0 = 8;
  let width = floor(fwidth * rr);
  let refBox = my.refBox;
  let ptsIndex = 0;
  my.pane0 = new Pane({ backgImg, x0, y0, z0, width, height, refBox, ptsIndex });
}

function create_pane1() {
  let fwidth = my.width;
  let height = my.height;
  let backgImg = my.backgImg;
  let rr = my.paneRatio;
  let x0 = floor(fwidth * (1 - rr));
  let y0 = 0;
  let z0 = 4.5;
  let initCentered = 1;
  let width = floor(fwidth * rr);
  let refBox = my.refBox;
  let ptsIndex = 1;
  my.pane1 = new Pane({ backgImg, x0, y0, z0, width, height, initCentered, refBox, ptsIndex });
}

function draw_crossHairs() {
  stroke(255);
  strokeWeight(1);
  for (let ment of my.lastMouseEnts) {
    line(ment.x, 0, ment.x, height);
    line(0, ment.y, width, ment.y);
  }
  if (my.shiftTracking) {
    line(mouseX, 0, mouseX, height);
    line(0, mouseY, width, mouseY);
  }
}

function canvas_mousePressed() {
  // console.log('canvas_mousePressed');

  if (keyIsDown(SHIFT)) {
    logMouseEnts();
    my.shiftTracking = 1;
  } else {
    my.mouseTracking = 1;
  }

  if (my.pane1.touchPoint(mouseX, mouseY)) {
    setPane(my.pane1);
  } else if (my.pane0.touchPoint(mouseX, mouseY)) {
    setPane(my.pane0);
  }
  my.pane.mousePressed();
}

function canvas_mouseReleased() {
  // console.log('canvas_mouseReleased');
  if (my.shiftTracking) {
    logMouseEnts();
  }
  my.pane.mouseReleased();
  my.mouseTracking = 0;
  my.shiftTracking = 0;
}

function logMouseEnts() {
  let ment = { x: mouseX, y: mouseY };
  my.lastMouseEnts[my.lastMouseIndex] = ment;
  my.lastMouseIndex = (my.lastMouseIndex + 1) % 2;
}

// !!@ no canvas mouseDragged
// my.canvas.mouseDragged(canvas_mouseDragged);

// image(img, x, y, [width], [height])
// image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight], [fit], [xAlign], [yAlign])

// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md
