function my_init() {
  //
  pixelDensity(1);

  my.dbStoreRootPath = '-mo-storage-video-@w-';

  let today = new Date();
  let str = today.toISOString();
  my.clipsName += '-' + str.substring(0, 10);

  if (my.png) {
    // png image type preserves white background
    my.imageType = 'image/png';
    my.imagExt = '.png';
  } else {
    // jpeg give black background
    my.imageType = 'image/jpeg';
    my.imagExt = '.jpg';
  }
  if (windowWidth < 600) {
    my.width = windowWidth;
    my.height = windowHeight;
  }
  if (my.vFlip) {
    let temp = my.width;
    my.width = my.height;
    my.height = temp;
  }

  // image are store in sequence
  // {my.dbStoreRootPath}/clips/${nums}${my.imagExt}
  my.image_seq_pad = 3;

  init_layer();

  my.next_secs = millis() / 1000 + my.interval;

  init_counts();

  sound_init();
}

function init_layer() {
  let w = int(my.width / my.rezScale);
  let h = int(my.height / my.rezScale);
  my.layer = createGraphics(w, h);
  my.vwidth = w;
  my.vheight = h;
  my.captionSize = my.layer.height / my.captionScale;
  my.layer.noStroke();
}

function init_counts() {
  // my.image_seq_up = 0;
  // my.image_seq_down = my.image_seq_max - 1;
  // my.count = my.count_base;
  my.count = 0;
}
