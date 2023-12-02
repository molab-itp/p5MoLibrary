// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md
// PlanetEarth

let angle = 2.8;
let angleStep = 0.001;
let angleDir = 1;
let table;
let aRadius = 200;

let earthImg;

let cam;

function preload() {
  earthImg = loadImage('earth.jpg');
}

function setup() {
  // createCanvas(600, 600, WEBGL);
  createCanvas(windowWidth, windowHeight, WEBGL);
  aRadius = windowWidth * 0.33;

  cam = createCamera();
  // cam.pan(-0.8);
}

function draw() {
  background(51);

  // cam.pan(0.0001);

  rotateY(angle);

  // orbitControl();
  angle += angleStep * angleDir;

  lights();
  fill(255);
  noStroke();
  texture(earthImg);
  sphere(aRadius);
}

// https://editor.p5js.org/jht9629-nyu/sketches/SJtBwJIcU
// CC 58 - Earthquake Visualization 3D
