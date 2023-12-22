function my_init() {
  //
  init_query();

  my.layer = createGraphics(my.vwidth, my.vheight);
  my.crossHairLayer = createGraphics(my.vwidth, my.vheight);
  my.publishLayer = createGraphics(my.vwidth, my.vheight);

  my.pixRows = [];
  // my.videoColor = [0, 0, 0];
  my.uid = 0;
  // my.sub_uid = -1;
  my.sub_name = '?';
  my.nlobby = -1;

  if (my.scrollOnStart) {
    ui_toggle_scroll(my);
  }

  my.vx = 0;
  my.vy = 0;
  my.vxi = 0;
  my.vyi = 0;

  init_nstep();
}

function init_query() {
  my.query = get_url_params();
  if (my.query) {
    my.name = my.query.name;
    my.room_name = my.query.room || my.room_name;
    my.storeFlag = parseFloat(my.query.store || my.storeFlag);
    my.nstep = parseFloat(my.query.nstep || my.nstep);
    // my.perFrame = parseFloat(my.query.perFrame || my.perFrame);
    // my.byLine = parseFloat(my.query.byLine || my.byLine);
  }

  my.isPortrait = height > width;
  //   my.canvas = createCanvas(windowWidth, windowHeight - 90);

  if (my.isPortrait) {
    my.width = my.vwidth;
    my.height = my.vheight;
  } else {
    my.width = windowWidth;
    my.height = windowHeight - 90;
    // my.width = displayWidth;
    // my.height = displayHeight;
    // my.margin = 0;
  }
}

// my.vx = x - (x % my.stepPx);
// my.vy = y - (y % my.stepPx);
// my.vxi = floor(my.vx / my.stepPx);
// my.vyi = floor(my.vy / my.stepPx);

function init_nstep() {
  // my.stepPx = floor(my.vwidth / my.nstep);
  my.stepPx = floor(my.vheight / my.nstep);
  my.innerPx = floor(my.stepPx * (1 - my.margin));
  my.crossWt = my.stepPx - my.innerPx;
  my.byPixel = my.nstep < 16;
  my.byLine = my.nstep >= 16;
  // my.vx = 0;
  // my.vy = 0;
  // my.vxi = 0;
  // my.vyi = 0;
}

function update_nstep(n) {
  console.log('update_nstep n', n);
  my.nstep = n;
  init_nstep();
  my.nstep_selection.selected(my.nstep);
  // my.layer.clear();
}
