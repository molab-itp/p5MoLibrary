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
  my.version = '?v=039'; // update to verify change on mobile
  my.vwidth = 480; // Aspect ratio of video capture
  my.vheight = 640;
  my.storeFlag = 0;
  my.runFlag = 1;
  my.faceFlag = 1;
  my.videoFlag = 1;
  my.debugFlag = 0;
  my.scrollOnStart = 0;
  my.scrollStopSecs = 4;
  my.nstep = 8;
  my.margin = 0.1;
  my.byPixel = 0;
  // my.subscribe = 0;
  my.perFrame = 12;
  my.dbStoreRootPath = 'm0-@r-@w-';
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
}

function draw() {
  draw_frame();

  ui_update();
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
    draw_layer_publish(my.videoImg);
  }

  if (!my.storeFlag) {
    draw_layer_subscribe();
  }

  // draw layer to canvas
  image(my.layer, 0, 0);

  // Draw cross-hair
  if (!my.byLine && my.videoColor) {
    strokeWeight(my.crossWt);
    stroke(my.videoColor);
    let x = my.vx + my.innerPx / 2;
    let y = my.vy + my.innerPx / 2;
    line(x, 0, x, my.height);
    line(0, y, my.width, y);
  }
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
}

function mouseDragged() {
  // console.log('mouseDragged');
  track_xy();
  // required to prevent touch drag moving canvas on mobile
  return false;
}

// https://editor.p5js.org/jht9629-nyu/sketches/twgS6eWRZ
// pixel-grid
