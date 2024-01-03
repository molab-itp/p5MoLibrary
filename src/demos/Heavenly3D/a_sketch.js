// https://editor.p5js.org/jht9629-nyu/sketches/6VM5IMP4m
// Heavenly3D
// https://github.com/molab-itp/p5moLibrary/tree/main/src/demos/Heavenly3D

let my = {};

function preload() {
  my.backgImgIndex = 0;
  my.backgImgs = [];
  my.panScale = 3;

  my.earthImg = loadImage('../../assets/world-ultra.jpg');
  // my.earthImg = loadImage('../../assets/Da_Vinci.jpg');
  //
  my.moonImg = loadImage('../../assets/moon.jpg');
  //
  my.backgImgs.push(loadImage('../../assets/Manju.jpg'));
  my.backgImgs.push(loadImage('../../assets/plenty.jpeg'));
  my.backgImgs.push(loadImage('../../assets/sun.jpg'));
  my.backgImgs.push(loadImage('../../assets/The_Celestial_Zoo.png'));
  my.backgImgs.push(loadImage('../../assets/Da_Vinci.jpg'));
}

function setup() {
  //
  createCanvas(windowWidth, windowHeight - 90);

  my.width = width;
  my.height = height;

  init_pan();

  ui_init();

  make_earth();

  make_moon();

  make_camBody();

  setFocus(my.earth);
}

function draw() {
  background(0);
  draw_backgImg();
  ui_init_update();
}

// --

function init_pan() {
  my.panX = 0;
  my.panY = 0;
}

function setFocus(body) {
  console.log('setFocus', body.label);
  // if (my.focusBody && my.focusBody != body) {
  //   my.focusBody.setDir(dirStop);
  // }
  my.focusBody = body;
  my.focusBody.setDir(dirLeft);
}

// --

// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md
// https://github.com/molab-itp/98-MoGallery-p5js/tree/main/demos/PlanetEarth
// PlanetEarth

// https://editor.p5js.org/jht9629-nyu/sketches/SJtBwJIcU
// CC 58 - Earthquake Visualization 3D

// https://github.com/dmojdehi/SwiftGlobe.git
//  demos/assests/world-large.jpg
//  demos/assests/world-ultra.jpg
//  demos/assests/world.jpg

// https://editor.p5js.org/Bixbite/sketches/H1-rxu1sm
// CTC 8 - Solar System 3D by Bixbite
//  demos/assests/assets/moon.jpg
//  demos/assests/assets/venus.jpg
//  demos/assests/assets/phobos.jpg
//  demos/assests/assets/deimos.jpg
//  demos/assests/assets/sun.jpg

// https://en.wikipedia.org/wiki/Astronomical_object
//  demos/assests/assets/The_Celestial_Zoo.png
//  demos/assests/assets/Observable_Universe.png

// https://thecodingtrain.com/challenges/9-solar-system-3d-textures
// https://editor.p5js.org/codingtrain/sketches/SD8a6k6A

// https://en.wikipedia.org/wiki/Vitruvian_Man
// https://upload.wikimedia.org/wikipedia/commons/2/22/Da_Vinci_Vitruve_Luc_Viatour.jpg
//  demos/Heavenly3D/assets/Da_Vinci.jpg

// Manju.jpg
// https://en.wikipedia.org/wiki/Mandala
// https://en.wikipedia.org/wiki/File:Manjuvajramandala_con_43_divinit%C3%A0_-_Unknown_-_Google_Cultural_Institute.jpg
