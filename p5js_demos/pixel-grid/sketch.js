// https://editor.p5js.org/jht9629-nyu/sketches/twgS6eWRZ
// pixel-grid

let my = {
  version: 2, // update to verify change on mobile
  vwidth: 480, // Aspect ratio of video capture
  vheight: 640,
  face: 1,
  scrolling: 1,
  nstep: 16,
  margin: 0.1,
  byPixel: 1,
  run: 1,
  perFrame: 6,
  // byLine: 1,
};

function setup() {
  my_init();

  my.canvas = createCanvas(my.width, my.height);
  my.canvas.mouseReleased(canvas_mouseReleased);
  my.canvas.touchEnded(canvas_mouseReleased);

  background(255);
  noStroke();

  create_myVideo();

  create_ui();
}

function draw() {
  if (!video_ready()) return;

  check_scroll();

  if (frameCount % my.perFrame != 0) return;

  // faster to get entire video frame as an image
  let img = my.video.get();

  image(img, 0, 0);

  draw_layer(img);
}

function draw_layer(img) {
  let layer = my.layer;
  more = 1;
  let col;
  while (more) {
    col = img.get(my.vx, my.vy);
    layer.fill(col);
    layer.noStroke();
    layer.rect(my.vx, my.vy, my.rr, my.rr);
    if (!my.run) {
      break;
    }
    my.vx += my.stepPx;
    if (my.vx > my.vwidth) {
      my.vx = 0;
      my.vy += my.stepPx;
      if (my.vy > my.vheight) {
        more = 0;
        my.vy = 0;
      }
      if (my.byLine) {
        more = 0;
      }
    }
    if (my.byPixel) {
      more = 0;
    }
  }
  image(layer, 0, 0);

  // Draw cross-hair
  strokeWeight(my.crossWt);
  stroke(col);
  let x = my.vx + my.rr / 2;
  let y = my.vy + my.rr / 2;
  line(x, 0, x, my.height);
  line(0, y, my.width, y);
}

function my_init() {
  my.width = my.vwidth;
  my.height = my.vheight;
  my.layer = createGraphics(my.width, my.height);
  my.stepPx = floor(my.vwidth / my.nstep);
  my.rr = floor(my.stepPx * (1 - my.margin));
  my.crossWt = my.stepPx - my.rr;
  my.vx = 0;
  my.vy = 0;
}

function check_scroll() {
  if (my.scrolling) {
    window.scrollBy(0, 1);
  }
}

function create_myVideo() {
  let options = { video: { facingMode: my.facingMode } };
  my.video = createCapture(options);
  my.video.size(my.vwidth, my.vheight);
  my.video.hide();
}

function create_ui() {
  createSpan('v' + my.version);

  my.resetBtn = createButton('Reset');
  my.resetBtn.mousePressed(reset_action);

  my.faceChk = createCheckbox('Face', my.face);
  my.faceChk.style('display:inline');
  my.faceChk.changed(faceChk_action);

  my.runChk = createCheckbox('Run', my.run);
  my.runChk.style('display:inline');
  my.runChk.changed(function () {
    my.run = this.checked();
  });
}

function canvas_mouseReleased() {
  // console.log('canvas_mouseReleased');
  track_xy();
}

function track_xy() {
  my.vx = mouseX;
  my.vy = mouseY;
}

function mouseDragged() {
  // console.log('mouseDragged');
  track_xy();
  // required to prevent touch drag moving canvas on mobile
  return false;
}

function faceChk_action() {
  my.face = this.checked();
  my.facingMode = my.face ? 'user' : 'environment';
  console.log('my.facingMode', my.facingMode);
  my.video.remove();
  create_myVideo();
}

function reset_action() {
  location.reload();
}

function video_ready() {
  return my.video.loadedmetadata && my.video.width > 0 && my.video.height > 0;
}
