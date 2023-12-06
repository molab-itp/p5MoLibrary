// https://editor.p5js.org/jht9629-nyu/sketches
// https://github.com/molab-itp/98-MoGallery-p5js/tree/main/demos/Celestial_Zoo
// Celestial_Zoo

let my = {};

function preload() {
  //
  my.backgImgs = [];
  my.backgImgs.push(loadImage('../PlanetEarth/assets/The_Celestial_Zoo.png'));
}

function setup() {
  //
  my.canvas = createCanvas(windowWidth, windowHeight - 45);
  my.canvas.mousePressed(canvas_mousePressed);
  my.canvas.mouseReleased(canvas_mouseReleased);
  my.width = width;
  my.height = height;

  my.backgImgIndex = 0;

  pan_init();

  ui_create();
}

function draw() {
  //
  background(0);
  draw_backgImg();
  ui_update();
  if (my.mouseTracking) {
    canvas_mouseDragged();
  }
}

function pan_updateZoom(newValue) {
  let oRatio = my.zoomRatio;
  my.zoomIndex = newValue;
  my.zoomRatio = 1 / my.zoomIndex;

  let w = my.backgImg.width;
  let h = my.backgImg.height;
  let oW = floor(w * oRatio * 0.5);
  let oH = floor(h * oRatio * 0.5);

  let nW = floor(w * my.zoomRatio * 0.5);
  let nH = floor(h * my.zoomRatio * 0.5);

  my.panX = my.panX + oW - nW;
  my.panY = my.panY + oH - nH;
}

function pan_init() {
  my.panX = 0;
  my.panY = 0;
  my.zoomIndex = 8;
  my.zoomRatio = 1 / my.zoomIndex;
}

function pan_center() {
  my.zoomIndex = 8;
  let w = my.backgImg.width;
  let h = my.backgImg.height;
  let sWidth = floor(w * my.zoomRatio);
  let sHeight = floor(h * my.zoomRatio);
  my.panX = floor((w - sWidth) * 0.5);
  my.panY = floor((h - sHeight) * 0.5);
  // !!@ Need to correct center for dHeight < my.height
}

function draw_backgImg() {
  let backgImg = my.backgImgs[my.backgImgIndex];
  my.backgImg = backgImg;
  if (!backgImg) return;
  // zoom background image to the full width of the canvas
  let w = backgImg.width;
  let h = backgImg.height;
  let r = h / w;

  let dx = 0;
  let dy = 0;
  let dWidth = my.width;
  let dHeight = floor(dWidth * r);
  if (dHeight < my.height) {
    dHeight = my.height;
    dWidth = floor(dHeight / r);
  }

  let sx = my.panX;
  let sy = my.panY;
  let sWidth = floor(w * my.zoomRatio);
  let sHeight = floor(h * my.zoomRatio);

  image(backgImg, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);
}

function canvas_mousePressed() {
  console.log('canvas_mousePressed');
  my.mouseTracking = 1;
  my.panX0 = mouseX;
  my.panY0 = mouseY;
}

function canvas_mouseReleased() {
  // console.log('canvas_mouseReleased');
  my.mouseTracking = 0;
}

function canvas_mouseDragged() {
  // console.log('canvas_mouseDragged');
  my.panX += my.panX0 - mouseX;
  my.panY += my.panY0 - mouseY;
  my.panX0 = mouseX;
  my.panY0 = mouseY;
}

function nextBackgImg() {
  if (my.backgImgs.length <= 0) return;
  my.backgImgIndex = (my.backgImgIndex + 1) % my.backgImgs.length;
}

// !!@ no canvas mouseDragged
// my.canvas.mouseDragged(canvas_mouseDragged);

// image(img, x, y, [width], [height])
// image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight], [fit], [xAlign], [yAlign])

// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md
