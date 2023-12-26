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
  my.version = '?v=20'; // update to verify change on mobile
  my.vwidth = 480; // Aspect ratio of video capture
  my.vheight = 640;
  my.scrollFlag = false;
  my.settingsFlag = 0;
  my.storeFlag = 0;
  my.scanFlag = 1;
  my.faceFlag = 1;
  my.videoFlag = 1;
  my.logSummaryFlag = 0;
  my.logDetailFlag = 0;
  my.scrollOnStart = 0;
  my.scrollStopSecs = 4;
  my.nstep = 16;
  my.margin = 0.1;
  my.byPixel = 0;
  my.perFrame = 30;
  my.dbStoreRootPath = 'm0-@r-@w-';
  my.sub_index = 0;
  my.room_name = 'room0';
  my.updateRate = 0.2;
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

  video_create(my);

  // let config = fb_.init('jht9629');
  let config = fb_.init('jht1493');
  ui_log(my, 'config.projectId', config.projectId);

  dstore_init();

  anim_init();
}

function anim_init() {
  my.animLoop = new Anim({
    target: my, //
    time: my.updateRate,
    action: updateAction,
    loop: 1,
  });
  my.animLoop.start();
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

  if (!my.storeFlag || !my.isPortrait) {
    draw_received();
  }
}

function updateAction() {
  if (my.storeFlag) {
    draw_send(my.videoImg);
  }
  if (my.scanFlag) {
    draw_cross_hair_update();
    dstore_device_update();
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
    my.animLoop.updateTime(0.02);
  } else if (my.nstep > 8) {
    my.animLoop.updateTime(0.1);
  } else if (my.nstep > 4) {
    my.animLoop.updateTime(0.2);
  } else {
    my.animLoop.updateTime(1);
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
  // let layer = my.crossHairLayer;
  // layer.clear();
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
      updateStepScaleChange();
    }
  }
  vx = my.track_xi * my.stepPx;
  vy = my.track_yi * my.stepPx;
  let x = floor(vx + my.innerPx * 0.5);
  let y = floor(vy + my.innerPx * 0.5);
  let colr = my.videoImg.get(x, y);
  my.videoColor = colr;
  // layer.strokeWeight(my.crossWt);
  // layer.stroke(colr);
  // layer.line(x, 0, x, my.vheight);
  // layer.line(0, y, my.vwidth, y);
  // layer.fill(colr);
  // layer.noStroke();
  // layer.rect(vx, vy, my.innerPx, my.innerPx);
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
  track_xy();
  // required to prevent touch drag moving canvas on mobile
  // return false;
  return my.scrollFlag;
}

// https://editor.p5js.org/jht9629-nyu/sketches/twgS6eWRZ
// pixel-grid
