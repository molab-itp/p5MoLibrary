// https://editor.p5js.org/jht9629-nyu/sketches/TQyVoswjQ
// p5moLibrary DrawPoints
// https://github.com/molab-itp/p5moLibrary

let my = {};

function my_setup() {
  my.version = '?v=102';
  my.width = windowWidth;
  my.height = windowHeight;
  // my.width = 640;
  // my.height = 480;
  my.save_label = '1';
  // seconds to re-draw points
  my.lapse = 5;
  my.xoffset = 0;
  // my.xoffset = my.width / 2;
  my.draw_specs = [
    { color: 'red', strokeWeight: 12 + 2 },
    { color: 'green', strokeWeight: 7 + 2 },
    { color: 'yellow', strokeWeight: 2 + 2 },
  ];
  my.strokeWeight = 10;
  my.run = 1;
  // limit number of points in drawing
  my.npoint_limit = 0; // no limit
  // npoint_limit = 200;
  my.timedDrawing = 0;
  my.staticDrawing = 0;
  my.fourierDrawing = 0;

  my.backColor = 255;
  my.draw_color = 0; // 'white';
  my.updateCount = 0;
}

function setup() {
  my_setup();

  // my.canvas = createCanvas(my.width, my.height);

  my.drawPoints = new DrawPoints(my);

  let urlParams = get_url_params();
  my.drawPoints.restore_drawing(urlParams);

  ui_init();

  my.canvas = createCanvas(my.width, my.height);

  my.canvas.mouseReleased(canvas_mouseReleased);
  my.canvas.touchEnded(canvas_touchEnded);
  // my.canvas.touchStarted(canvas_touchStarted); // my.version = 14;
}

function mouseDragged() {
  // console.log('mouseDragged');
  my.drawPoints.mouseDragged();
  let inX = mouseX >= 0 && mouseX < width;
  let inY = mouseY >= 0 && mouseY < height;
  let onCanvas = inX && inY;
  // return false; // required to prevent touch drag moving canvas on mobile
  return !onCanvas;
}

function canvas_mouseReleased() {
  // console.log('canvas_mouseReleased');
  my.drawPoints.mouseReleased();
}

function canvas_touchEnded() {
  // console.log('canvas_touchEnded');
  my.drawPoints.mouseReleased();
}

function draw() {
  background(my.backColor);

  my.drawPoints.render();
}

// return seconds since start of sketch
function secsTime() {
  return millis() / 1000;
}

function formatNumber(num) {
  let prec = 1000;
  return int(num * prec) / prec;
}

//
function get_url_params() {
  let query = window.location.search;
  // console.log('query |' + query + '|');
  console.log('query.length', query.length);
  if (query.length < 1) return null;
  let params = params_query(query);
  return params;
  // let store = params['store'];
  // console.log('nstore', store);
  // return store;
}

// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
function params_query(query) {
  // eg. query='abc=foo&def=%5Basf%5D&xyz=5'
  // params={abc: "foo", def: "[asf]", xyz: "5"}
  const urlParams = new URLSearchParams(query);
  const params = Object.fromEntries(urlParams);
  return params;
}

// prevent_scrolling(); !!@ Not used
// https://alvarotrigo.com/blog/prevent-scroll-on-scrollable-element-js/
function prevent_scrolling() {
  document.querySelector('body').addEventListener('wheel', preventScroll, { passive: false });
  function preventScroll(e) {
    console.log('preventScroll');
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}
// localStorage.clear()

// https://www.buildingh.org

// https://editor.p5js.org/jht9629-nyu/sketches/MbS5C3j-F
// Necessary-forgery-DrawPoints

// convert to my.
// startTimedDraw as slider changes
// added a_drawings
// generalize draw_to
// remove class Point, use object literal for point
// added funtion lineFrom

// project files created with p5.vscode "Create p5.js Project"
// https://editor.p5js.org/jht9629-nyu/sketches/-t2O5JfBr
// DrawPoints
// !!@ p5.js/0.10.2

// TRY: use storeItem / getItem to save drawing locally
// https://p5js.org/reference/#/p5/storeItem
// https://p5js.org/reference/#/p5/getItem

// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/7.3-array-of-objects.html
// https://youtu.be/fBqaA7zRO58
// https://editor.p5js.org/codingtrain/sketches/1y_xfueO
