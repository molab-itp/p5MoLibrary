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
  my.canvas = createCanvas(windowWidth, windowHeight - 120);
  my.canvas.mousePressed(canvas_mousePressed);
  my.canvas.mouseReleased(canvas_mouseReleased);
  my.width = width;
  my.height = height;
  my.paneRatio = 12 / 16;

  create_pane1();

  create_pane2();

  my.pane = my.pane1;

  ui_create();

  my.lastMouseEnts = [];
  my.lastMouseIndex = 0;
}

function create_pane1() {
  let label = 'pane1';
  let fwidth = my.width;
  let height = my.height;
  let backgImg = my.backgImg;
  let r = my.paneRatio;
  let x = floor(fwidth * (1 - r));
  let y = 0;
  let z = 4.5;
  let initCentered = 1;
  let width = floor(fwidth * r);
  my.pane1 = new Pane({ label, backgImg, x, y, z, width, height, initCentered });
}

function create_pane2() {
  let label = 'pane2';
  let fwidth = my.width;
  let height = my.height;
  let backgImg = my.backgImg;
  let r = 1 - my.paneRatio;
  let x = 0;
  let y = 0;
  let z = 8;
  let width = floor(fwidth * r);
  my.pane2 = new Pane({ label, backgImg, x, y, z, width, height });
}

function draw() {
  //
  background(0);
  my.pane1.draw_backgImg();
  my.pane2.draw_backgImg();
  ui_update();
  if (my.mouseTracking) {
    my.pane.mouseDragged();
  }
  stroke(255);
  strokeWeight(1);
  for (let ment of my.lastMouseEnts) {
    line(ment.x, 0, ment.x, height);
    line(0, ment.y, width, ment.y);
  }
}

function canvas_mousePressed() {
  // console.log('canvas_mousePressed');
  my.mouseTracking = 1;
  if (my.pane1.touchPoint(mouseX, mouseY)) {
    setPane(my.pane1);
  } else if (my.pane2.touchPoint(mouseX, mouseY)) {
    setPane(my.pane2);
  }
  my.pane.mousePressed();

  let ment = { x: mouseX, y: mouseY };
  my.lastMouseEnts[my.lastMouseIndex] = ment;
  my.lastMouseIndex = (my.lastMouseIndex + 1) % 2;
}

function canvas_mouseReleased() {
  // console.log('canvas_mouseReleased');
  my.pane.mouseReleased();
  my.mouseTracking = 0;
}

// !!@ no canvas mouseDragged
// my.canvas.mouseDragged(canvas_mouseDragged);

// image(img, x, y, [width], [height])
// image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight], [fit], [xAlign], [yAlign])

// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md
