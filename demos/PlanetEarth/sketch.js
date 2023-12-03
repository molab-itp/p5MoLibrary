// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md
// PlanetEarth

function preload() {
  my.earthImg = loadImage('assets/world-ultra.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  my.aRadius = floor(windowHeight * 0.38);
  my.layer = createGraphics(windowWidth, windowHeight, WEBGL);
  nextDir();
}

function draw() {
  background(0);

  let layer = my.layer;

  layer.rotateX(my.angleX);
  layer.rotateY(my.angleY);

  my.angleX += my.angleXstep * my.angleXdir;
  my.angleY += my.angleYstep * my.angleYdir;

  layer.lights();
  layer.texture(my.earthImg);
  layer.sphere(my.aRadius, 24 * my.aDetail, 16 * my.aDetail);

  image(layer, 0, 0);
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
