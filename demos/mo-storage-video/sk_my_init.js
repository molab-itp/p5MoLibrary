function my_init() {
  my.rootPath = '-mo-2-@w-';
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

  my.layer = createGraphics(my.width, my.height);

  my.len = int(my.width / 20);
}
