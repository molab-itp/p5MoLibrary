// mo-storage-video

let vScale = 4;

let my = {
  version: 28, // update to verify change on mobile
  vwidth: 640 / vScale,
  vheight: 480 / vScale,
  vFlip: 0,
  facingMode: 1,
  showVideo: 1,
  frameCount: 0,
};

function setup() {
  console.log('mo-storage-video setup');

  my_init();

  pixelDensity(1);
  my.canvas = createCanvas(my.width, my.height);

  ui_init();

  create_myVideo();

  textSize(height / 8);

  frameRate(2);
}

function draw() {
  if (!video_ready()) return;

  // faster to get entire video frame as an image
  let img = my.video.get();

  if (my.showVideo) {
    image(img, 0, 0);
  }

  let str = frameCount + '';
  let tw = textWidth(str);
  let th = textLeading();
  let ta = textAscent();

  let x = width - tw;
  let y = height - th;
  fill(0);
  rect(x, y, tw, th);
  fill(255);
  text(frameCount, x, y + ta);

  frameCount++;
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
