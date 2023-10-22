// mo-storage-video

let my = {
  version: '?v=08', // update to verify change on mobile
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
  image_seq_max: 15,
  count_init: 100,
  count_max: 15,
  colors: ['red', 'green', 'gold'],
  colorIndex: 0,
  logLinesMax: 5,
};

function setup() {
  console.log('mo-storage-video setup');

  // fb_.init('jht9629');
  fb_.init('jht1493');

  my_init();

  pixelDensity(1);
  my.canvas = createCanvas(my.width, my.height);

  ui_init();

  // setInterval will flood out draw when saving and replaying
  // setInterval(update_interval, my.interval * 1000);
  // frameRate(2);

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
  let str = my.count + '';
  let tw = layer.textWidth(str);
  let th = layer.textLeading();
  let ta = layer.textAscent();

  // let x = layer.width - tw;
  // let y = layer.height - th;
  let cnt = my.count + 1;
  // console.log('draw_update cnt', cnt);
  let x = 0;
  let y = 0;
  let colr = my.colors[my.colorIndex];
  layer.fill(colr);
  layer.rect(x, y, tw, th);
  layer.fill(255);
  layer.text(cnt, x, y + ta);
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
    // console.log('update_interval fstore_download');
    fstore_download();
    // return;
  }
  if (my.store) {
    fstore_upload();
  }
  if (my.run) {
    my.count = my.count + 1;
    if (my.count >= my.count_init + my.count_max) {
      my.colorIndex = (my.colorIndex + 1) % my.colors.length;
      my.count = my.count_init;
    }
  }
}

function fb_signIn() {
  let { signInAnonymously, auth } = fb_;
  signInAnonymously(auth)
    .then(() => {
      console.log('signInAnonymously OK');
      my.uid = auth.currentUser.uid;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode', errorCode);
      console.log('errorMessage', errorMessage);
    });
}

// https://en.wikipedia.org/wiki/15_minutes_of_fame
// --> 15 seconds
