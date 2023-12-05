// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md
// https://github.com/molab-itp/98-MoGallery-p5js/tree/main/demos/PlanetEarth
// PlanetEarth

function preload() {
  my.earthImg = loadImage('assets/world-ultra.jpg');
  my.moonImg = loadImage('assets/moon.jpg');
  // my.backgImg = loadImage('assets/The_Celestial_Zoo.png');
  my.backgImgs.push(loadImage('assets/plenty.jpeg'));
  my.backgImgs.push(loadImage('assets/The_Celestial_Zoo.png'));
  my.backgImgs.push(loadImage('assets/sun.jpg'));
}

function setup() {
  createCanvas(windowWidth, windowHeight - 70);

  my.width = width;
  my.height = height;

  ui_create();

  make_earth1();

  make_body2();

  make_camBody();
}

function make_earth1() {
  let x = 0;
  let y = 0;
  let h = my.height;
  let img = my.earthImg;
  let flushRight = 1;
  let orbitControl = 1;
  my.earth = new HeavenlyBody({ x, y, width: my.width, height: h, img, flushRight, orbitControl });
  my.earth.label = 'earth';
  my.earth.setDir(dirRight);
}

function make_body2() {
  let x = 0;
  let y = floor(my.height * 0.25);
  let h = my.height / 2;
  let img = my.moonImg;
  let flushRight = 0;
  let orbitControl = 1;
  my.body2 = new HeavenlyBody({ x, y, width: my.width, height: h, img, flushRight, orbitControl });
  my.body2.label = 'moon';
  my.body2.setDir(dirLeft);
}

function make_camBody() {
  my.capture = createCapture(VIDEO);
  my.capture.hide();
  let h = floor(my.height * 0.3);
  // let x = floor(my.width / 2 - h / 2);
  let x = floor(my.width * 0.3);
  // let y = 0;
  // let y = floor(my.height * 0.5);
  let y = -floor(my.height * 0.07);
  let img = null;
  let flushRight = 0;
  let orbitControl = 1;
  let capture = my.capture;
  my.camBody = new HeavenlyBody({ x, y, width: my.width, height: h, img, flushRight, orbitControl, capture });
  my.camBody.label = 'camBody';
  my.camBody.setDir([0, 10, 0]);
}

function draw() {
  background(0);
  draw_backgImg();
  ui_update();
}

function draw_backgImg() {
  let backgImg = my.backgImgs[my.backgImgIndex];
  if (!backgImg) return;
  // Scale background image to the full width of the canvas
  let w = backgImg.width;
  let h = backgImg.height;
  let wr = my.width;
  let hr = wr * (h / w);
  image(backgImg, 0, 0, wr, hr);
}

function nextBackgImg() {
  if (my.backgImgs.length <= 0) return;
  my.backgImgIndex = (my.backgImgIndex + 1) % my.backgImgs.length;
}

function nextDir() {
  my.dirIndex = (my.dirIndex + 1) % my.dirs.length;
  let newDir = my.dirs[my.dirIndex];
  my.earth.setDir(newDir);
  // my.earth.angleXdir = newDir[0];
  // my.earth.angleYdir = newDir[1];
}

function mouseDragged_na() {
  //
  let newDir = dirStop;
  // let delta = floor(width * 0.05);
  let delta = 0;
  if (mouseX - pmouseX > delta) {
    newDir = dirRight;
  } else if (mouseX - pmouseX < -delta) {
    newDir = dirLeft;
  } else if (mouseY - pmouseY > delta) {
    newDir = dirDown;
  } else if (mouseY - pmouseY < -delta) {
    newDir = dirUp;
  }
  my.earth.setDir(newDir);
}

function mousePressed_na() {
  nextBackgImg();
}

function mousePressed_na() {
  nextDir();
}

// https://editor.p5js.org/jht9629-nyu/sketches/SJtBwJIcU
// CC 58 - Earthquake Visualization 3D

// https://github.com/dmojdehi/SwiftGlobe.git
//  demos/HeavenlyBodyEarth/world-large.jpg
//  demos/HeavenlyBodyEarth/world-ultra.jpg
//  demos/HeavenlyBodyEarth/world.jpg

// https://editor.p5js.org/Bixbite/sketches/H1-rxu1sm
// CTC 8 - Solar System 3D by Bixbite
//  demos/HeavenlyBodyEarth/assets/moon.jpg
//  demos/HeavenlyBodyEarth/assets/venus.jpg
//  demos/HeavenlyBodyEarth/assets/phobos.jpg
//  demos/HeavenlyBodyEarth/assets/deimos.jpg
//  demos/HeavenlyBodyEarth/assets/sun.jpg

// https://en.wikipedia.org/wiki/Astronomical_object
//  demos/HeavenlyBodyEarth/assets/The_Celestial_Zoo.png
//  demos/HeavenlyBodyEarth/assets/Observable_Universe.png

// https://thecodingtrain.com/challenges/9-solar-system-3d-textures
// https://editor.p5js.org/codingtrain/sketches/SD8a6k6A
