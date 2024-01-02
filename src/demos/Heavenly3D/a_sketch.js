// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md
// Heavenly3D
// https://github.com/molab-itp/p5moLibrary/tree/main/src/demos/Heavenly3D

let my = {};

function preload() {
  my.backgImgs = [];

  my.earthImg = loadImage('../../assets/world-ultra.jpg');
  // my.earthImg = loadImage('../../assets/Da_Vinci.jpg');
  //
  my.moonImg = loadImage('../../assets/moon.jpg');
  //
  my.backgImgs.push(loadImage('../../assets/Manju.jpg'));
  my.backgImgs.push(loadImage('../../assets/plenty.jpeg'));
  my.backgImgs.push(loadImage('../../assets/sun.jpg'));
  my.backgImgs.push(loadImage('../../assets/The_Celestial_Zoo.png'));
  my.backgImgs.push(loadImage('../../assets/Da_Vinci.jpg'));
}

function setup() {
  //
  my_setup();

  createCanvas(windowWidth, windowHeight - 90);

  my.width = width;
  my.height = height;

  init_pan();
  my.panScale = 3;

  ui_init();

  make_earth();

  make_moon();

  make_camBody();

  setFocus(my.earth);
}

function draw() {
  background(0);
  draw_backgImg();
  ui_init_update();
}

function mousePressed() {
  if (my.earth.pointInside(mouseX, mouseY)) {
    setFocus(my.earth);
  } else if (my.body2.pointInside(mouseX, mouseY)) {
    setFocus(my.body2);
  } else if (my.camBody.pointInside(mouseX, mouseY)) {
    setFocus(my.camBody);
  } else {
    my.shiftTracking = 1;
    my.panX0 = mouseX;
    my.panY0 = mouseY;
  }
}

function setFocus(body) {
  console.log('setFocus', body.label);
  if (my.focusBody && my.focusBody != body) {
    my.focusBody.setDir(dirStop);
  }
  my.focusBody = body;
  my.focusBody.setDir(dirLeft);
}

function mouseDragged() {
  let inX = mouseX >= 0 && mouseX < width;
  let inY = mouseY >= 0 && mouseY < height;
  let onCanvas = inX && inY;
  if (onCanvas) {
    if (my.shiftTracking) {
      my.panX += my.panX0 - mouseX;
      my.panY += my.panY0 - mouseY;
      my.panX0 = mouseX;
      my.panY0 = mouseY;
    }
  }
  // return false to allow scrolling on mobile
  return !onCanvas;
}

function mouseReleased() {
  // console.log('mouseReleased');
  // my.mouseTracking = 0;
  my.shiftTracking = 0;
}

// --

function init_pan() {
  my.panX = 0;
  my.panXStep = 1;
  my.panY = 0;
  my.panYStep = 1;
}

function draw_backgImg() {
  let backgImg = my.backgImgs[my.backgImgIndex];
  if (!backgImg) return;
  // Scale background image to the full width of the canvas
  let ww = backgImg.width;
  let hh = backgImg.height;
  let rr = hh / ww;
  let scale = my.panScale;

  let dx = 0;
  let dy = 0;
  let dWidth = my.width;
  let dHeight = floor(dWidth * rr);
  if (dHeight < my.height) {
    dHeight = my.height;
    dWidth = floor(dHeight / rr);
  }

  let sx = my.panX;
  let sy = my.panY;
  let sWidth = floor(ww / scale);
  let sHeight = floor(hh / scale);

  image(backgImg, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);
}

// image(img, x, y, [width], [height])
// image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight], [fit], [xAlign], [yAlign])

function draw_backgImg_full() {
  let backgImg = my.backgImgs[my.backgImgIndex];
  if (!backgImg) return;
  // Scale background image to the full width of the canvas
  let w = backgImg.width;
  let h = backgImg.height;
  let wr = my.width;
  let hr = wr * (h / w);
  image(backgImg, 0, 0, wr, hr);
}

let uuScale = 0.3;

function make_earth() {
  let img = my.earthImg;
  let uu = floor(my.height * uuScale);
  let x = my.width - uu;
  let y = 0;
  let width = uu;
  let height = uu;
  let orbitControl = 1;
  my.earth = new HeavenlyBody({ x, y, width, height, img, orbitControl });
  my.earth.label = 'earth';
  my.earth.setDir(dirRight);
}

function make_moon() {
  let img = my.moonImg;
  let uu = floor(my.height * uuScale);
  let x = 0;
  let y = 0;
  let width = uu;
  let height = uu;
  let orbitControl = 1;
  my.body2 = new HeavenlyBody({ x, y, width, height, img, orbitControl });
  my.body2.label = 'moon';
  my.body2.setDir(dirStop);
}

function make_camBody() {
  my.capture = createCapture(VIDEO);
  my.capture.hide();
  let uu = floor(my.height * uuScale);
  // center on x
  let x = floor((my.width - uu) * 0.5);
  let y = 0;
  let img = null;
  let width = uu;
  let height = uu;
  let orbitControl = 1;
  let capture = my.capture;
  my.camBody = new HeavenlyBody({ x, y, width, height, img, orbitControl, capture });
  my.camBody.label = 'camBody';
  my.camBody.setDir(dirStop);
  // Spiral from top of camera
  my.camBody.setAngle(-1.5, 3.0, 0);
}

function nextBackgImg() {
  if (my.backgImgs.length <= 0) return;
  init_pan();
  my.backgImgIndex = (my.backgImgIndex + 1) % my.backgImgs.length;
}

function nextDir() {
  my.dirIndex = (my.dirIndex + 1) % my.dirs.length;
  let newDir = my.dirs[my.dirIndex];
  my.earth.setDir(newDir);
  // my.earth.angleXdir = newDir[0];
  // my.earth.angleYdir = newDir[1];
}

// https://editor.p5js.org/jht9629-nyu/sketches/SJtBwJIcU
// CC 58 - Earthquake Visualization 3D

// https://github.com/dmojdehi/SwiftGlobe.git
//  demos/assests/world-large.jpg
//  demos/assests/world-ultra.jpg
//  demos/assests/world.jpg

// https://editor.p5js.org/Bixbite/sketches/H1-rxu1sm
// CTC 8 - Solar System 3D by Bixbite
//  demos/assests/assets/moon.jpg
//  demos/assests/assets/venus.jpg
//  demos/assests/assets/phobos.jpg
//  demos/assests/assets/deimos.jpg
//  demos/assests/assets/sun.jpg

// https://en.wikipedia.org/wiki/Astronomical_object
//  demos/assests/assets/The_Celestial_Zoo.png
//  demos/assests/assets/Observable_Universe.png

// https://thecodingtrain.com/challenges/9-solar-system-3d-textures
// https://editor.p5js.org/codingtrain/sketches/SD8a6k6A

// https://en.wikipedia.org/wiki/Vitruvian_Man
// https://upload.wikimedia.org/wikipedia/commons/2/22/Da_Vinci_Vitruve_Luc_Viatour.jpg
//  demos/Heavenly3D/assets/Da_Vinci.jpg

// Manju.jpg
// https://en.wikipedia.org/wiki/Mandala
// https://en.wikipedia.org/wiki/File:Manjuvajramandala_con_43_divinit%C3%A0_-_Unknown_-_Google_Cultural_Institute.jpg
