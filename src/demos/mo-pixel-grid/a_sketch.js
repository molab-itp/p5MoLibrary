// https://editor.p5js.org/jht9629-nyu/sketches/7Wjlo3pPU
// mo-pixel-grid

// http://127.0.0.1:5502/demos/mo-pixel-grid/index.html?sub=sjht1
// http://127.0.0.1:5502/demos/mo-pixel-grid/index.html?pub=pjht1
//
// my.name = my.query.name;
// my.publish = my.query.pub;
// my.nstep = my.query.nstep || my.nstep;
// my.perFrame = my.query.perFrame || my.perFrame;
// my.byLine = my.query.byLine || my.byLine;

let my = {};

function my_setup() {
  my.version = '?v=15'; // update to verify change on mobile
  my.vwidth = 480; // Aspect ratio of video capture
  my.vheight = 640;
  my.exposeFlag = 0;
  my.storeFlag = 0;
  my.runFlag = 1;
  my.faceFlag = 1;
  my.videoFlag = 1;
  my.debugFlag = 0;
  my.scrollOnStart = 0;
  my.scrollStopSecs = 4;
  my.nstep = 16;
  my.margin = 0.1;
  my.byPixel = 0;
  // my.subscribe = 0;
  my.perFrame = 30;
  my.dbStoreRootPath = 'm0-@r-@w-';
  my.sub_index = 0;
  my.room_name = 'room0';
  my.updateRate = 0.2;
  // my.updateCount = 0;
  // my.updateCountMax = 5 / my.updateRate;
  my.nstepScale = 2;
  my.name = '?';
}

function setup() {
  my_setup();
  my_init();

  my.canvas = createCanvas(my.width, my.height);
  my.canvas.mouseReleased(canvas_mouseReleased);
  my.canvas.touchEnded(canvas_mouseReleased);

  ui_init();

  let config = fb_.init('jht9629');
  // ui_log('config.projectId', config.projectId);
  ui_log(my, 'config.projectId', config.projectId);

  dstore_init();

  anim_init();
}

function anim_init() {
  my.animLoop = new Anim({
    target: my, //
    duration: my.updateRate,
    action: updateAction,
    loop: 1,
  });
  if (my.runFlag) {
    my.animLoop.start();
  }
}

function draw() {
  draw_frame();

  ui_update();

  my.animLoop.step();
}

function draw_frame() {
  if (my.videoFlag && !video_ready(my)) return;

  ui_check_scroll(my);

  background(0);

  if (my.videoFlag) {
    // faster to get entire video frame as an image
    my.videoImg = my.video.get();
    image(my.videoImg, 0, 0);
  }

  if (
    frameCount % my.perFrame == 0 && //
    my.storeFlag &&
    my.videoImg
  ) {
    // draw_layer_publish(my.videoImg);
  } else {
    // image(my.layer, 0, 0);
  }

  if (!my.storeFlag || !my.isPortrait) {
    draw_layer_subscribe();
  }

  draw_cross_hair();
}

function updateAction() {
  // console.log('updateAction my.vx', my.vx, 'my.vy', my.vy, 'my.vwidth', my.vwidth);
  if (my.storeFlag) {
    draw_layer_publish(my.videoImg);
  }
  if (my.runFlag) {
    draw_cross_hair_update();
    dstore_lobby_update();
  }
}

function updateStepScaleChange() {
  // my.updateCount = (my.updateCount + 1) % my.updateCountMax;
  // if (my.updateCount == 0) {
  my.nstep *= my.nstepScale;
  if (my.nstep >= 32 || my.nstep < 8) {
    my.nstepScale = 1 / my.nstepScale;
    my.nstep *= my.nstepScale * 2;
  }
  if (my.nstep > 16) {
    my.animLoop.updateDuration(0.02);
  } else if (my.nstep > 8) {
    my.animLoop.updateDuration(0.1);
  } else if (my.nstep > 4) {
    my.animLoop.updateDuration(0.2);
  } else {
    my.animLoop.updateDuration(1);
  }

  init_nstep();

  // if (my.nstep == 1) {
  //   my.sub_index = (my.sub_index + 1) % 2;
  // }
}

function draw_cross_hair() {
  let layer = my.crossHairLayer;
  image(layer, 0, 0);
}

function draw_cross_hair_update() {
  if (!my.videoImg) return;
  let layer = my.crossHairLayer;
  layer.clear();
  if (my.track_xy_updated) {
    my.track_xy_updated = 0;
  } else {
    my.vx += my.stepPx;
    my.vxi += 1;
    if (my.vx + my.stepPx > my.vwidth) {
      my.vx = 0;
      my.vxi = 0;
      my.vy += my.stepPx;
      my.vyi += 1;
    }
    // Need to check out side prior if for when nstep changes
    // in middle of top to bottom scan
    if (my.vy + my.stepPx > my.vheight) {
      my.vy = 0;
      my.vyi = 0;
      updateStepScaleChange();
    }
  }
  let x = floor(my.vx + my.innerPx * 0.5);
  let y = floor(my.vy + my.innerPx * 0.5);
  let colr = my.videoImg.get(x, y);
  my.videoColor = colr;
  layer.strokeWeight(my.crossWt);
  layer.stroke(colr);
  layer.line(x, 0, x, my.vheight);
  layer.line(0, y, my.vwidth, y);
  layer.fill(colr);
  layer.noStroke();
  layer.rect(my.vx, my.vy, my.innerPx, my.innerPx);
}

function canvas_mouseReleased() {
  // console.log('canvas_mouseReleased');
  track_xy();
}

function track_xy() {
  let x = mouseX;
  let y = mouseY;
  my.vx = x - (x % my.stepPx);
  my.vy = y - (y % my.stepPx);
  my.vxi = floor(my.vx / my.stepPx);
  my.vyi = floor(my.vy / my.stepPx);
  my.track_xy_updated = 1;
  draw_cross_hair_update();
}

function mouseDragged() {
  // console.log('mouseDragged');
  track_xy();
  // required to prevent touch drag moving canvas on mobile
  return false;
}

// https://editor.p5js.org/jht9629-nyu/sketches/twgS6eWRZ
// pixel-grid
