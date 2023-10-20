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
  my.image_seq_up = my.initCount;
  my.image_seq_down = my.initCount;
  my.image_seq_pad = 3;
  my.count = my.initCount;

  {
    let w = int(my.width / my.scale);
    let h = int(my.height / my.scale);
    my.layer = createGraphics(w, h);
    my.vwidth = w;
    my.vheight = h;
    my.layer.textSize(my.layer.height / my.captionScale);
  }

  my.draw_func = draw_guest;
}
