// https://editor.p5js.org/jht9629-nyu/sketches/twgS6eWRZ
// pixel-grid

let my = {
  version: 6, // update to verify change on mobile
  vwidth: 480, // Aspect ratio of video capture
  vheight: 640,
  face: 1,
  scrolling: 1,
  nstep: 16,
  margin: 0.1,
  byPixel: 1,
  // byLine: 1,
  run: 1,
  perFrame: 6,
  storeRootKey: 'm0-update-web',
  // storeData: {
  //   DK1Lcj16BFhDPgdvGGkVP9FS3Xy2: {
  //     count_i: 1,
  //     date_i: 1692655136999,
  //     date_s: '2023-08-21T21:58:56.999Z',
  //   },
  // },
  // query:
  //  u -> userName
  //  h -> hostName
};

function setup() {
  my_init();

  my.canvas = createCanvas(my.width, my.height);
  my.canvas.mouseReleased(canvas_mouseReleased);
  my.canvas.touchEnded(canvas_mouseReleased);

  background(200);
  noStroke();

  ui_init();

  dstore_init();
}

function draw() {
  my.draw_func();
}

function draw_host() {
  console.log('draw_host');

  check_scroll();
}

function draw_guest() {
  if (!video_ready()) return;

  check_scroll();

  if (frameCount % my.perFrame != 0) return;

  // faster to get entire video frame as an image
  let img = my.video.get();

  image(img, 0, 0);

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
