// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md
// PlanetEarth

function preload() {
  my.earthImg = loadImage('assets/world-ultra.jpg');
  my.plentyImg = loadImage('assets/plenty-3.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let x = 0;
  let y = 0;
  let earthImg = my.earthImg;
  let flushRight = 1;
  my.earth = new Earth({ x, y, width, height, earthImg, flushRight });

  nextDir();
}

function draw() {
  background(0);
  // draw_plenty();
}

function draw_plenty() {
  let w = my.plentyImg.width;
  let h = my.plentyImg.height;
  let wr = windowWidth;
  let hr = windowHeight;
  image(my.plentyImg, 0, 0, wr, hr);
}

function mouseDragged() {
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
