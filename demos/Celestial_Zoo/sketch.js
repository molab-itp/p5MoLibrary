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
  my.canvas = createCanvas(windowWidth, windowHeight - 45);
  my.canvas.mousePressed(canvas_mousePressed);
  my.canvas.mouseReleased(canvas_mouseReleased);
  my.width = width;
  my.height = height;

  let backgImg = my.backgImg;
  my.pane = new Pane({ backgImg, width, height });

  ui_create();
}

function draw() {
  //
  background(0);
  my.pane.draw_backgImg();
  ui_update();
  if (my.mouseTracking) {
    my.pane.mouseDragged();
  }
}

function canvas_mousePressed() {
  console.log('canvas_mousePressed');
  my.mouseTracking = 1;
  my.pane.mousePressed();
}

function canvas_mouseReleased() {
  // console.log('canvas_mouseReleased');
  my.mouseTracking = 0;
}

// !!@ no canvas mouseDragged
// my.canvas.mouseDragged(canvas_mouseDragged);

// image(img, x, y, [width], [height])
// image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight], [fit], [xAlign], [yAlign])

// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md
