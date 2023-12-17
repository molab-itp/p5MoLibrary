// https://editor.p5js.org/jht9629-nyu/sketches/7Wjlo3pPU
// mo-pixel-grid

// http://127.0.0.1:5502/demos/mo-pixel-grid/index.html?sub=sjht
// http://127.0.0.1:5502/demos/mo-pixel-grid/index.html?pub=pjht
//
// my.publishName = my.query.pub;
// my.subscribeName = my.query.sub;
// my.nstep = my.query.nstep || my.nstep;
// my.perFrame = my.query.perFrame || my.perFrame;
// my.byLine = my.query.byLine || my.byLine;

let my = {};

function my_setup() {
  my.version = '?v=036'; // update to verify change on mobile
  my.vwidth = 480; // Aspect ratio of video capture
  my.vheight = 640;
  my.face = 1;
  my.showVideo = 1;
  my.scrollOnStart = 0;
  my.scrollStopSecs = 4;
  my.nstep = 8;
  my.margin = 0.1;
  my.byPixel = 0;
  my.run = 1;
  my.store = 0;
  my.subscribe = 0;
  my.perFrame = 6;
  my.dbStoreRootPath = 'm0-@r-@w-';
}

function setup() {
  my_setup();
  my_init();

  my.canvas = createCanvas(my.width, my.height);
  my.canvas.mouseReleased(canvas_mouseReleased);
  my.canvas.touchEnded(canvas_mouseReleased);

  ui_init();

  dstore_init();
}

function draw() {
  my.draw_func();

  ui_update();
}

function draw_subscribe() {
  // console.log('draw_subscribe');

  check_scroll();

  draw_layer_subscribe();
}

function draw_publish() {
  if (!video_ready()) return;

  check_scroll();

  if (frameCount % my.perFrame != 0) return;

  background(0);

  // faster to get entire video frame as an image
  let img = my.video.get();

  if (my.showVideo) {
    image(img, 0, 0);
  }

  draw_layer_publish(img);
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
