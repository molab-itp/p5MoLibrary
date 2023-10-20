// mo-storage-video

let my = {
  version: '?v=02', // update to verify change on mobile
  width: 480, // Aspect ratio of video capture
  height: 640,
  vFlip: 0,
  facingMode: 1,
  count: 100,
  face: 1,
  showVideo: 1,
  run: 1,
  store: 0,
  host: 0,
  uid: -1,
  // scale: 16,
  scale: 1,
  captionScale: 8,
  interval: 1,
  debugLog: 0,
  // imageQuality: 0.01,
  imageQuality: 1,
};

function setup() {
  console.log('mo-storage-video setup');

  fb_.init();

  my_init();

  pixelDensity(1);
  my.canvas = createCanvas(my.width, my.height);

  ui_init();

  setInterval(update_interval, my.interval * 1000);
  // frameRate(2);
}

function draw() {
  my.draw_func();

  ui_update();
}

function draw_host() {
  // console.log('draw_host');
}

function draw_guest() {
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

  let x = layer.width - tw;
  let y = layer.height - th;
  layer.fill(0);
  layer.rect(x, y, tw, th);
  layer.fill(255);
  layer.text(my.count, x, y + ta);

  image(layer, 0, 0, width, height);

  ui_update();
}

function update_interval() {
  // console.log('update_interval my.count', my.count, count);
  if (my.host) {
    fstore_download();
    return;
  }
  if (my.run) {
    my.count++;
  }
  if (my.store) {
    fstore_upload();
  }
}

function fb_signIn() {
  let { signInAnonymously, auth } = fb_;
  signInAnonymously(auth)
    .then(() => {
      console.log('signInAnonymously OK');
      let uid = auth.currentUser.uid;
      my.uid = uid;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode', errorCode);
      console.log('errorMessage', errorMessage);
    });
}

function console_dlog(msg) {
  if (my.debugLog) {
    console.log(msg);
  }
}
