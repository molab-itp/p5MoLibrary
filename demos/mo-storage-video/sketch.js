// mo-storage-video

let my = {
  version: '?v=012', // update to verify change on mobile
  width: 480, // Aspect ratio of video capture
  height: 640,
  vFlip: 0,
  facingMode: 'user',
  face: 1,
  showVideo: 1,
  run: 1,
  store: 0,
  replay: 0,
  uid: -1,
  // scale: 16,
  scale: 4,
  // imageQuality: 0.01,
  imageQuality: 1,
  captionScale: 8,
  interval: 1,
  debugLog: 1,
  // image_seq_max: 5,
  count_base: 100,
  count_max: 5,
  colors: ['red', 'green', 'gold'],
  colorIndex: 0,
  logLinesMax: 5,
};

function setup() {
  console.log('mo-storage-video setup');

  my_init();

  pixelDensity(1);
  my.canvas = createCanvas(my.width, my.height);

  ui_init();

  let config = fb_.init('jht9629');
  // let config = fb_.init('jht1493');
  ui_log('config.projectId', config.projectId);

  fb_signIn();
}

function draw() {
  draw_update();

  ui_update();
}

function draw_update() {
  if (!video_ready()) return;

  // faster to get entire video frame as an image
  let img = my.video.get();

  let layer = my.layer;

  if (my.showVideo) {
    layer.image(img, 0, 0);
  }

  draw_number(my.count + 1 + my.count_base, { layer });
  draw_millis(layer);

  if (!my.replay) {
    image(layer, 0, 0, width, height);
  }

  ui_update();

  let now = millis() / 1000;
  if (now > my.next_secs) {
    my.next_secs = now + my.interval;
    update_interval();
  }
}

function update_interval() {
  // console.log('update_interval my.count', my.count);
  if (my.replay) {
    fstore_download();
  }
  if (my.store) {
    fstore_upload();
  }
  if (my.run) {
    if (adjust_count(1)) {
      my.colorIndex = (my.colorIndex + 1) % my.colors.length;
    }
  }
}

function adjust_count(delta) {
  my.count = my.count + delta;
  let wrap = 0;
  if (my.count >= my.count_max) {
    my.count = 0;
    wrap = 1;
  } else if (my.count < 0) {
    my.count = my.count_max - 1;
    wrap = 1;
  }
  return wrap;
}

function fb_signIn() {
  let { signInAnonymously, auth } = fb_;
  signInAnonymously(auth)
    .then(() => {
      ui_log('signInAnonymously OK');
      my.uid = auth.currentUser.uid;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      ui_log('fb_signIn errorCode', errorCode);
      ui_log('fb_signIn errorMessage', errorMessage);
    });
}

// https://en.wikipedia.org/wiki/15_minutes_of_fame
// --> 15 seconds

// setInterval will flood out draw when saving and replaying
// setInterval(update_interval, my.interval * 1000);
// frameRate(2);
