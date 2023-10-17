// mo-storage-video

let vScale = 4;

let my = {
  version: 28, // update to verify change on mobile
  vwidth: 640 / vScale,
  vheight: 480 / vScale,
  vFlip: 0,
  facingMode: 1,
  showVideo: 1,
};

function setup() {
  console.log('mo-storage setup');

  my_init();

  pixelDensity(1);
  my.cnv = createCanvas(my.width, my.height);

  ui_init();

  create_myVideo();
}

function draw() {
  if (!video_ready()) return;

  // faster to get entire video frame as an image
  let img = my.video.get();

  if (my.showVideo) {
    image(img, 0, 0);
  }
}

function draw_mouse() {
  let cl = random(['red', 'green', 'yellow']);
  stroke(cl);
  let sw = 4;
  strokeWeight(sw);
  noFill();
  let w = my.len;
  let x = mouseX - (mouseX % w);
  let y = mouseY - (mouseY % w);
  circle(x, y, w - sw);
}

function create_myVideo() {
  let options = { video: { facingMode: my.facingMode } };
  my.video = createCapture(options);
  my.video.size(my.vwidth, my.vheight);
  // my.video.hide();
}

function video_ready() {
  return my.video.loadedmetadata && my.video.width > 0 && my.video.height > 0;
}
