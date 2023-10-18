function my_init() {
  my.rootPath = '-mo-storage-video-@w-';
  my.type = 'image/png'; // png image type preserves white background
  // my.type = 'image/jpeg'; // jpeg give black background
  my.ext = '.png';
  // my.ext = '.jpg';
  my.quality = 1;
  if (my.vFlip) {
    let temp = my.vwidth;
    my.vwidth = my.vheight;
    my.vheight = temp;
  }
  my.width = my.vwidth;
  my.height = my.vheight;

  // image are store in sequence
  // {my.rootPath}/clips/${nums}${my.ext}
  my.image_seq_num = 0;
  my.image_seq_max = 9;
  my.image_seq_pad = 3;
  my.layer = createGraphics(my.width, my.height);

  my.len = int(my.width / 20);
}
