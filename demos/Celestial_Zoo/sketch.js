// https://editor.p5js.org/jht9629-nyu/sketches/xxxx
// https://github.com/molab-itp/98-MoGallery-p5js/tree/main/demos/Celestial_Zoo
// PlanetEarth

function preload() {
  //
  my.backgImgs.push(loadImage('../PlanetEarth/assets/The_Celestial_Zoo.png'));
}

function setup() {
  createCanvas(windowWidth, windowHeight - 70);

  my.width = width;
  my.height = height;

  init_pan();

  ui_create();
}

function init_pan() {
  my.panX = 0;
  my.panXStep = 1;
  my.panY = 0;
  my.panYStep = 1;
  my.scale = 8;
}

function draw_backgImg() {
  let backgImg = my.backgImgs[my.backgImgIndex];
  if (!backgImg) return;
  // Scale background image to the full width of the canvas
  let w = backgImg.width;
  let h = backgImg.height;
  let r = h / w;
  let scale = my.scale;

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
  let sWidth = floor(w / scale);
  let sHeight = floor(h / scale);

  image(backgImg, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);
}

function mousePressed() {
  my.panX0 = mouseX;
  my.panY0 = mouseY;
}

function mouseDragged() {
  my.panX += my.panX0 - mouseX;
  my.panY += my.panY0 - mouseY;
  my.panX0 = mouseX;
  my.panY0 = mouseY;
}

// image(img, x, y, [width], [height])
// image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight], [fit], [xAlign], [yAlign])

function draw() {
  background(0);
  draw_backgImg();
  ui_update();
}

function nextBackgImg() {
  if (my.backgImgs.length <= 0) return;
  my.backgImgIndex = (my.backgImgIndex + 1) % my.backgImgs.length;
}

// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md
