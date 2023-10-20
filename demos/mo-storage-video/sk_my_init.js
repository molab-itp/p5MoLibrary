function my_init() {
  my.rootPath = '-mo-storage-video-@w-/clips';
  if (my.png) {
    // png image type preserves white background
    my.type = 'image/png';
    my.ext = '.png';
  } else {
    // jpeg give black background
    my.type = 'image/jpeg';
    my.ext = '.jpg';
  }
  if (my.vFlip) {
    let temp = my.width;
    my.width = my.height;
    my.height = temp;
  }

  // image are store in sequence
  // {my.rootPath}/clips/${nums}${my.ext}
  my.image_seq_pad = 3;

  {
    let w = int(my.width / my.scale);
    let h = int(my.height / my.scale);
    my.layer = createGraphics(w, h);
    my.vwidth = w;
    my.vheight = h;
    my.layer.textSize(my.layer.height / my.captionScale);

    my.downLayer;
  }

  // my.draw_func = draw_guest;

  init_counts();

  my.next_secs = millis() / 1000 + my.interval;
}

function init_counts() {
  my.image_seq_up = 0;
  my.image_seq_down = my.image_seq_max - 1;
  my.count = my.count_init;
}
