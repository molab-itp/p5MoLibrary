// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md
// PlanetEarth

let angleX = -0.6;
// let angleY = 2.8; // Africa
let angleY = 5.0; // North America
let angleStep = 0.001;
let angleDir = 1;

let table;
let aRadius = 200;
let aDetail = 2;

let earthImg;

let cam;

function preload() {
  // earthImg = loadImage('world.jpg');
  earthImg = loadImage('world-large.jpg');
  // earthImg = loadImage('earth.jpg');
}

function setup() {
  // createCanvas(600, 600, WEBGL);
  createCanvas(windowWidth, windowHeight, WEBGL);
  aRadius = windowWidth * 0.33;

  cam = createCamera();
  // cam.pan(-0.8);
}

function draw() {
  background(0);

  // cam.pan(0.0001);

  rotateX(angleX);
  rotateY(angleY);

  // orbitControl();
  angleY += angleStep * angleDir;

  lights();
  fill(255);
  noStroke();
  texture(earthImg);
  sphere(aRadius, 24 * aDetail, 16 * aDetail);
}

function mousePressed() {
  angleDir = (angleDir + 1) % 2;
}

// https://editor.p5js.org/jht9629-nyu/sketches/SJtBwJIcU
// CC 58 - Earthquake Visualization 3D
