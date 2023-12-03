// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md
// PlanetEarth

let my = {
  angleX: -0.6,
  // angleY: 2.8, // Africa
  angleY: 5.0, // North America
  angleStep: 0.001,
  angleDir: 1,
  aRadius: 200,
  aDetail: 4,
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

  my.cam = createCamera();
  // cam.pan(-0.8);
}

function draw() {
  background(0);

  // cam.pan(0.0001);

  rotateX(my.angleX);
  rotateY(my.angleY);

  // orbitControl();
  my.angleY += my.angleStep * my.angleDir;

  lights();
  fill(255);
  noStroke();
  texture(my.earthImg);
  sphere(my.aRadius, 24 * my.aDetail, 16 * my.aDetail);
}

function mousePressed() {
  my.angleDir = (my.angleDir + 1) % 2;
}

// https://editor.p5js.org/jht9629-nyu/sketches/SJtBwJIcU
// CC 58 - Earthquake Visualization 3D

// https://github.com/dmojdehi/SwiftGlobe.git
//  demos/PlanetEarth/world-large.jpg
//  demos/PlanetEarth/world-ultra.jpg
//  demos/PlanetEarth/world.jpg
