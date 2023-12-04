// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md
// PlanetEarth

function preload() {
  my.earthImg = loadImage('assets/world-ultra.jpg');
  my.moonImg = loadImage('assets/moon.jpg');
  // my.backgImg = loadImage('assets/The_Celestial_Zoo.png');
  my.backgImgs.push(loadImage('assets/plenty.jpeg'));
  my.backgImgs.push(loadImage('assets/The_Celestial_Zoo.png'));
}

function setup() {
  createCanvas(windowWidth, windowHeight - 70);

  my.width = width;
  my.height = height;

  ui_create();

  make_earth1();

  make_body2();

  nextDir();
}

function make_earth1() {
  let x = 0;
  let y = 0;
  let h = my.height;
  let img = my.earthImg;
  let flushRight = 1;
  let orbitControl = 1;
  my.earth = new Planet({ x, y, width: my.width, height: h, img, flushRight, orbitControl });
}

function make_body2() {
  let x = 0;
  let y = 0;
  let h = my.height / 2;
  let img = my.moonImg;
  let flushRight = 0;
  let orbitControl = 1;
  my.earth2 = new Planet({ x, y, width: my.width, height: h, img, flushRight, orbitControl });
  my.earth2.setAngle(-0.567, 5.0, 0); // USA
  my.earth2.setDir(dirStop);
}

function draw() {
  background(0);
  draw_backgImg();
  ui_update();
}

function draw_backgImg() {
  if (my.backgImgs.length <= 0) return;
  let backgImg = my.backgImgs[my.backgImgIndex];
  if (!backgImg) return;
  let w = backgImg.width;
  let h = backgImg.height;
  let wr = my.width;
  let hr = wr * (h / w);
  image(backgImg, 0, 0, wr, hr);
}

function mouseDragged_no() {
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

// https://editor.p5js.org/jht9629-nyu/sketches/SJtBwJIcU
// CC 58 - Earthquake Visualization 3D

// https://github.com/dmojdehi/SwiftGlobe.git
//  demos/PlanetEarth/world-large.jpg
//  demos/PlanetEarth/world-ultra.jpg
//  demos/PlanetEarth/world.jpg

// https://editor.p5js.org/Bixbite/sketches/H1-rxu1sm
// CTC 8 - Solar System 3D by Bixbite
//  demos/PlanetEarth/assets/moon.jpg
//  demos/PlanetEarth/assets/venus.jpg
//  demos/PlanetEarth/assets/phobos.jpg
//  demos/PlanetEarth/assets/deimos.jpg
//  demos/PlanetEarth/assets/sun.jpg

// https://en.wikipedia.org/wiki/Astronomical_object
//  demos/PlanetEarth/assets/The_Celestial_Zoo.png
//  demos/PlanetEarth/assets/Observable_Universe.png

// https://thecodingtrain.com/challenges/9-solar-system-3d-textures
// https://editor.p5js.org/codingtrain/sketches/SD8a6k6A
