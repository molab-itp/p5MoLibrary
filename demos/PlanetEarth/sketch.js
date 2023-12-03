// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md
// PlanetEarth

let my = {
  angleX: -0.6,
  angleXstep: 0.001,
  angleXdir: 1,
  // angleY: 2.8, // Africa

  angleY: 5.0, // North America
  angleYstep: 0.001,
  angleYdir: 0,

  aRadius: 200,
  aDetail: 4,
  dirs: [
    [0, 1],
    [0, 0],
    [0, -1],
    [0, 0],
    [1, 0],
    [0, 0],
    [-1, 0],
    [0, 0],
  ],
  dirIndex: 0,
};

function preload() {
  my.earthImg = loadImage('world-ultra.jpg');
  // earthImg = loadImage('world-large.jpg');
  // earthImg = loadImage('world.jpg');
  // earthImg = loadImage('earth.jpg');
}

function setup() {
  // createCanvas(600, 600, WEBGL);
  createCanvas(windowWidth, windowHeight, WEBGL);
  my.aRadius = windowHeight * 0.38;
  nextDir();
}

function draw() {
  background(0);

  rotateX(my.angleX);
  rotateY(my.angleY);

  my.angleX += my.angleXstep * my.angleXdir;
  my.angleY += my.angleYstep * my.angleYdir;

  lights();
  texture(my.earthImg);
  sphere(my.aRadius, 24 * my.aDetail, 16 * my.aDetail);
}

function mousePressed() {
  nextDir();
}

function nextDir() {
  my.dirIndex = (my.dirIndex + 1) % my.dirs.length;
  let newDirs = my.dirs[my.dirIndex];
  my.angleXdir = newDirs[0];
  my.angleYdir = newDirs[1];
}

// https://editor.p5js.org/jht9629-nyu/sketches/SJtBwJIcU
// CC 58 - Earthquake Visualization 3D

// https://github.com/dmojdehi/SwiftGlobe.git
//  demos/PlanetEarth/world-large.jpg
//  demos/PlanetEarth/world-ultra.jpg
//  demos/PlanetEarth/world.jpg
