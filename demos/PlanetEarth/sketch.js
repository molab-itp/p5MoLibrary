// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md
// PlanetEarth

function preload() {
  my.earthImg = loadImage('assets/world-ultra.jpg');
  my.plentyImg = loadImage('assets/plenty-3.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  my.earth = new Earth({ x: 0, y: 0, width, height, earthImg: my.earthImg });

  nextDir();
}

function draw() {
  background(0);
  let w = my.plentyImg.width;
  let h = my.plentyImg.height;
  let wr = windowWidth;
  let hr = windowHeight;
  // image(my.plentyImg, 0, 0, wr, hr);
}

function mousePressed() {
  nextDir();
}

function nextDir() {
  my.dirIndex = (my.dirIndex + 1) % my.dirs.length;
  let newDirs = my.dirs[my.dirIndex];
  my.earth.angleXdir = newDirs[0];
  my.earth.angleYdir = newDirs[1];
}

// https://editor.p5js.org/jht9629-nyu/sketches/SJtBwJIcU
// CC 58 - Earthquake Visualization 3D

// https://github.com/dmojdehi/SwiftGlobe.git
//  demos/PlanetEarth/world-large.jpg
//  demos/PlanetEarth/world-ultra.jpg
//  demos/PlanetEarth/world.jpg
