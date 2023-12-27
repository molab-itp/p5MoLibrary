function my_init() {
  //
  init_query();

  my.layer = createGraphics(my.vwidth, my.vheight);
  my.crossHairLayer = createGraphics(my.vwidth, my.vheight);
  // my.publishLayer = createGraphics(my.vwidth, my.vheight);

  my.uid = 0;
  my.sub_name = '?';
  my.ndevice = -1;

  if (my.scrollOnStart) {
    ui_toggle_scroll(my);
  }

  my.track_xi = 0;
  my.track_yi = 0;
  my.send_xi = 0;
  my.send_yi = 0;

  init_nstep();
}

function init_query() {
  my.query = get_url_params();
  if (my.query) {
    my.name = my.query.name;
    my.roomName = my.query.room || my.roomName;
    my.storeFlag = parseFloat(my.query.store || my.storeFlag);
    my.nstep = parseFloat(my.query.nstep || my.nstep);
    // my.perFrame = parseFloat(my.query.perFrame || my.perFrame);
    // my.byLine = parseFloat(my.query.byLine || my.byLine);
  }

  my.isPortrait = height > width;

  if (my.isPortrait) {
    my.width = my.vwidth;
    my.height = my.vheight;
  } else {
    my.width = windowWidth;
    my.height = windowHeight - 90;
    // my.width = displayWidth;
    // my.height = displayHeight;
  }
}

function init_nstep() {
  // my.stepPx = floor(my.vwidth / my.nstep);
  if (my.nstep < 4) {
    my.margin = 0;
  } else {
    my.margin = 0.1;
  }
  my.stepPx = floor(my.vheight / my.nstep);
  my.innerPx = floor(my.stepPx * (1 - my.margin));
  my.crossWt = my.stepPx - my.innerPx;
  my.byPixel = my.nstep < 16;
  my.byLine = my.nstep >= 16;
}

function update_nstep(n) {
  console.log('update_nstep n', n);
  my.nstep = n;
  init_nstep();
  my.nstep_selection.selected(my.nstep);
  // my.layer.clear();
}
