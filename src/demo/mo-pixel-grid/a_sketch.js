// https://editor.p5js.org/jht9629-nyu/sketches/7Wjlo3pPU
// mo-pixel-grid jht9629 fireb_firebase.js

let my = {};

function setup() {
  my_setup();
  my_init();

  my.canvas = createCanvas(my.width, my.height);
  my.canvas.mouseReleased(canvas_mouseReleased);
  my.canvas.touchEnded(canvas_mouseReleased);

  ui_init();

  video_create();

  let config = fireb_.init('jht9629');
  // let config = fireb_.init('jht1493');
  ui_log('config.projectId', config.projectId, 'configLabel', config.configLabel);

  dstore_init({ dstore_host_init });

  anim_init();
}

function dstore_host_init() {
  dstore_pixgrid_onChild();
  dstore_pixchip_onChild();
}

function anim_init() {
  my.animLoop = new Anim({ target: my, time: my.updateTime, loop: 1 });
  my.animLoop.start();
}

function draw() {
  draw_frame();

  ui_init_update();

  my.animLoop.step({ action: updateAction });
}

function draw_frame() {
  if (my.videoFlag && !video_ready()) return;

  ui_check_scroll();

  background(0);

  if (my.videoFlag) {
    // faster to get entire video frame as an image
    my.videoImg = my.video.get();
    image(my.videoImg, 0, 0);
  }

  // if (!my.storeFlag) {
  dstore_received();
  // }
}

function updateAction() {
  if (my.storeFlag) {
    dstore_send(my.videoImg);
  }
  if (my.scanFlag) {
    draw_cross_hair_update();
    dstore_pixchip_update();
  }
}

function nstepIndex_update() {
  my.nstepIndex += my.nstepDir;
  if (my.nstepIndex < 0 || my.nstepIndex >= my.nstepCycle.length) {
    // my.nstepDir *= -1;
    // my.nstepIndex += my.nstepDir * 2;
    my.nstepIndex = 0;
  }
  my.nstep = my.nstepCycle[my.nstepIndex];

  my.updateTime = my.updateTimes[my.nstepIndex];

  my.animLoop.updateTime(my.updateTime);

  // console.log('nstepIndex', my.nstepIndex, 'nstep', my.nstep);

  nstep_update(my.nstep);
}

function draw_cross_hair() {
  let layer = my.crossHairLayer;
  image(layer, 0, 0);
}

function draw_cross_hair_update() {
  if (!my.videoImg) return;
  let vx = my.track_xi * my.stepPx;
  let vy = my.track_yi * my.stepPx;
  if (my.track_xy_updated) {
    my.track_xy_updated = 0;
  } else {
    my.track_xi += 1;
    vx = my.track_xi * my.stepPx;
    if (vx + my.stepPx > my.vwidth) {
      my.track_xi = 0;
      my.track_yi += 1;
      vy = my.track_yi * my.stepPx;
    }
    // Need to check out side prior if for when nstep changes
    // in middle of top to bottom scan
    if (vy + my.stepPx > my.vheight) {
      my.track_yi = 0;
      nstepIndex_update();
    }
  }
  vx = my.track_xi * my.stepPx;
  vy = my.track_yi * my.stepPx;
  let x = floor(vx + my.innerPx * 0.5);
  let y = floor(vy + my.innerPx * 0.5);
  let colr = my.videoImg.get(x, y);
  my.videoColor = colr;
}

function canvas_mouseReleased() {
  // console.log('canvas_mouseReleased');
  track_xy();
}

function track_xy() {
  let x = mouseX;
  let y = mouseY;
  let vx = x - (x % my.stepPx);
  let vy = y - (y % my.stepPx);
  my.track_xi = floor(vx / my.stepPx);
  my.track_yi = floor(vy / my.stepPx);
  my.track_xy_updated = 1;
  draw_cross_hair_update();
}

function mouseDragged() {
  // console.log('mouseDragged');
  // required to prevent touch drag moving canvas on mobile
  // return false;
  let onCanvas = mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height;
  if (onCanvas) {
    track_xy();
  }
  return my.scrollFlag ? true : !onCanvas;
}

function windowResized() {
  // console.log('windowResized windowHeight', windowHeight, 'windowWidth', windowWidth);
  // my.isPortrait = windowHeight > windowWidth;
  if (isPortraitView()) {
    return;
  }
  resizeCanvas(windowWidth, windowHeight);
  // console.log('windowResized width', width, 'height', height);
}

// https://editor.p5js.org/jht9629-nyu/sketches/twgS6eWRZ
// pixel-grid
