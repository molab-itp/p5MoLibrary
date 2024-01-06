// https://editor.p5js.org/jht9629-nyu/sketches ----
// https://github.com/molab-itp/p5moLibrary
// Display regions of a Astronomical infographic with animated panning and zooming
// controlled by mo-astro-remote

let my = {};

function preload() {
  //
  my.backgImg = loadImage('../../assets/The_Celestial_Zoo.png');
}

function setup() {
  //
  my.canvas = createCanvas(windowWidth, windowHeight - 90);
  my.canvas.mousePressed(canvas_mousePressed);
  my.canvas.mouseReleased(canvas_mouseReleased);
  my.width = width;
  my.height = height;
  my.paneRatio = 12 / 16;
  my.isPortrait = height > width;
  my.scanFlag = 1;

  my.refBox = new RefBox(refBox_init);

  create_pane0();

  create_pane1();

  my.pane = my.pane1;

  ui_init();

  // my.animLoop = new Anim({ target: my, time: 15 });
  // if (my.scanFlag) {
  //   my.animLoop.start();
  // }

  focusAction();

  my.cycleCount = 1;

  // dstore interface

  let config = fb_.init('jht1493');
  console.log('?v=43 config.projectId', config.projectId, 'configLabel', config.configLabel);

  my.dstore_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.astro_index = 0;
  my.logLoud = 1;

  dstore_init();
}

function draw() {
  //
  background(0);
  my.pane1.render();
  my.pane0.render();
  ui_init_update();
  if (my.mouseTracking) {
    my.pane.mouseDragged();
  }
  draw_crossHairs();
  // my.animLoop.step({ action: nextRefAction, loop: my.scanFlag });
  // drawCycleCount();
}

function dstore_init() {
  // console.log('dstore_init ');
  let { signInAnonymously, auth } = fb_;
  signInAnonymously(auth)
    .then(() => {
      my.uid = auth.currentUser.uid;
      // console.log('dstore_init my.uid', my.uid);
      ui_log(my, 'dstore_init', my.uid);

      dstore_device_update();
      dstore_device_onChild();
      dstore_astro_onChild({ mo_astro_index_changed });
    })
    .catch((error) => {
      ui_log(my, 'dstore_init error', error);
    });
}

function mo_astro_index_changed(oldValue, newValue) {
  console.log('mo_astro_index_changed oldValue', oldValue, 'newValue', newValue);
  refAdjustTo(newValue);
}

function drawCycleCount() {
  let lapse = my.animLoop.lapse();
  let { x0, y0, width, height } = my.pane0;
  let h = floor(height * 0.025);
  let y = y0 + height - h;
  let x = x0;
  let str = Number(lapse).toFixed(1).padStart(4, '0');
  str = str + ' ' + my.cycleCount;
  fill(0);
  noStroke();
  rect(x, y, width, h);
  fill(255);
  textSize(h);
  text(str, x, y + h);
}

function formatNum(num) {
  return Number(num).toLocaleString();
}

function draw_crossHairs() {
  stroke(255);
  strokeWeight(1);
  for (let ment of my.mouseXYs) {
    line(ment.x, 0, ment.x, height);
    line(0, ment.y, width, ment.y);
  }
  if (my.shiftTracking) {
    line(mouseX, 0, mouseX, height);
    line(0, mouseY, width, mouseY);
  }
}

function canvas_mousePressed() {
  // console.log('canvas_mousePressed');

  if (keyIsDown(SHIFT)) {
    saveMouseXY();
    my.shiftTracking = 1;
  } else {
    my.mouseTracking = 1;
  }

  if (my.pane1.touchPoint(mouseX, mouseY)) {
    setPane(my.pane1);
  } else if (my.pane0.touchPoint(mouseX, mouseY)) {
    setPane(my.pane0);
  }
  my.pane.mousePressed();
}

function canvas_mouseReleased() {
  // console.log('canvas_mouseReleased');
  if (my.shiftTracking) {
    saveMouseXY();
  }
  my.pane.mouseReleased();
  my.mouseTracking = 0;
  my.shiftTracking = 0;
}

function clearMouseXY() {
  my.mouseXYs = [];
  my.mouseXYindex = 0;
}

function saveMouseXY() {
  let ment = { x: mouseX, y: mouseY };
  my.mouseXYs[my.mouseXYindex] = ment;
  my.mouseXYindex = (my.mouseXYindex + 1) % 2;
}

// !!@ no canvas mouseDragged
// my.canvas.mouseDragged(canvas_mouseDragged);

// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md

// https://commons.wikimedia.org/wiki/File:The_Celestial_Zoo_infographic_wikimedia.png
// Infographic listing 210 notable astronomical objects marked on a central
// logarithmic map of the observable universe. A small view and some distinguishing
// features are included for each astronomical object

// https://en.wikipedia.org/wiki/Astronomical_object
