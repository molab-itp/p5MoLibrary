// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md
// PlanetEarth

function preload() {
  my.earthImg = loadImage('assets/world-ultra.jpg');
  // my.backgImg = loadImage('assets/sun.jpg');
  my.moonImg = loadImage('assets/moon.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  make_earth1();

  make_body2();

  ui_create();

  nextDir();
}

function make_earth1() {
  let x = 0;
  let y = 0;
  let h = height;
  let img = my.earthImg;
  let flushRight = 1;
  let orbitControl = 1;
  my.earth = new Planet({ x, y, width, height: h, img, flushRight, orbitControl });
}

function make_body2() {
  let x = 0;
  let y = 0;
  let h = height / 2;
  let img = my.moonImg;
  let flushRight = 0;
  let orbitControl = 1;
  my.earth2 = new Planet({ x, y, width, height: h, img, flushRight, orbitControl });
  my.earth2.setAngle(-0.567, 5.0, 0); // USA
  my.earth2.setDir(dirStop);
}

function draw() {
  background(0);
  draw_backgImg();
  ui_update();
}

function draw_backgImg() {
  if (!my.backgImg) return;
  let w = my.backgImg.width;
  let h = my.backgImg.height;
  let wr = windowWidth;
  let hr = windowHeight;
  image(my.backgImg, 0, 0, wr, hr);
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

function mousePressed_no() {
  nextDir();
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
