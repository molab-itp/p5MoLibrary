// https://editor.p5js.org/jht9629-nyu/sketches/7Wjlo3pPU
// mo-pixel-grid

let my = {
  version: 27, // update to verify change on mobile
  vwidth: 480, // Aspect ratio of video capture
  vheight: 640,
  face: 1,
  showVideo: 1,
  scrollOnStart: 0,
  scrollStopSecs: 4,
  nstep: 16,
  margin: 0.1,
  byPixel: 0,
  run: 1,
  store: 0,
  host: 0,
  perFrame: 6,
  storeRootKey: 'm0-@r-@w-',
};

function setup() {
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

function draw_host() {
  console.log('draw_host');

  check_scroll();
}

function draw_guest() {
  if (!video_ready()) return;

  check_scroll();

  if (frameCount % my.perFrame != 0) return;

  background(0);

  // faster to get entire video frame as an image
  let img = my.video.get();

  if (my.showVideo) {
    image(img, 0, 0);
  }

  draw_layer(img);
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
}

function mouseDragged() {
  // console.log('mouseDragged');
  track_xy();
  // required to prevent touch drag moving canvas on mobile
  return false;
}

// https://editor.p5js.org/jht9629-nyu/sketches/twgS6eWRZ
// pixel-grid
