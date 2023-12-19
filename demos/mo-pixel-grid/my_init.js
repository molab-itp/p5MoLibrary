function my_init() {
  //
  init_query();

  my.layer = createGraphics(my.width, my.height);

  my.pixRows = [];
  // my.videoColor = [0, 0, 0];
  my.uid = -1;
  my.sub_uid = -1;
  my.sub_name = '?';
  my.nlog = -1;

  if (my.scrollOnStart) {
    ui_toggle_scroll(my);
  }
  init_nstep();
}

function init_query() {
  my.query = get_url_params();
  if (my.query) {
    my.name = my.query.name;
    my.storeFlag = parseFloat(my.query.store || my.storeFlag);
    my.nstep = my.query.nstep || my.nstep;
    my.perFrame = my.query.perFrame || my.perFrame;
    my.byLine = my.query.byLine || my.byLine;
  }
  if (my.storeFlag) {
    my.width = my.vwidth;
    my.height = my.vheight;
  } else {
    my.width = my.vwidth;
    my.height = my.vheight;
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
  if (!my.query || !my.query.byLine) {
    my.byLine = my.nstep > 16;
  }
  my.vx = 0;
  my.vy = 0;
  my.vxi = 0;
  my.vyi = 0;
}
