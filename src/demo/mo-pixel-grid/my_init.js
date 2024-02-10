function my_init() {
  //
  my.nstep = my.nstepCycle[my.nstepIndex];
  my.updateTime = my.updateTimes[my.nstepIndex];

  localStore_get();

  init_query();

  my.layer = createGraphics(my.vwidth, my.vheight);
  my.crossHairLayer = createGraphics(my.vwidth, my.vheight);
  // my.publishLayer = createGraphics(my.vwidth, my.vheight);

  my.uid = 0;
  my.ndevice = -1;

  if (my.scrollOnStartFlag) {
    ui_toggle_scroll();
  }

  my.track_xi = 0;
  my.track_yi = 0;
  my.send_xi = 0;
  my.send_yi = 0;

  nstep_init();
}

function localStore_get() {
  let str = localStorage.getItem('mo-pixel-grid');
  if (!str) {
    return;
  }
  // console.log('localStore_get str', str);
  console.log('localStore_get n str', str.length);
  let values = JSON.parse(str);
  for (let prop in values) {
    my[prop] = values[prop];
  }
}

function localStore_set() {
  let values = {};
  for (let prop in my.storeProps) {
    values[prop] = my[prop];
  }
  let str = JSON.stringify(values);
  localStorage.setItem('mo-pixel-grid', str);
  console.log('localStore_set n str', str.length);
}

function init_query() {
  my.query = get_url_params();
  if (my.query) {
    my.nameDevice = my.query.name || my.nameDevice;
    my.roomName = my.query.room || my.roomName;
    my.storeFlag = parseFloat(my.query.store || my.storeFlag);
    my.nstep = parseFloat(my.query.nstep || my.nstep);
    // my.perFrame = parseFloat(my.query.perFrame || my.perFrame);
    // my.byLine = parseFloat(my.query.byLine || my.byLine);
  }
  console.log('init_query windowHeight', windowHeight, 'windowWidth', windowWidth);
  // my.isPortrait = windowHeight > windowWidth;
  if (isPortraitView()) {
    my.width = my.vwidth;
    my.height = my.vheight * 4;
  } else {
    my.width = windowWidth;
    my.height = windowHeight;
    // my.width = displayWidth;
    // my.height = displayHeight;
  }
}

function isPortraitView() {
  return windowHeight > windowWidth;
}

function nstep_init() {
  if (my.nstep < 4) {
    my.margin = 0;
  } else {
    my.margin = 0.1;
  }
  // my.stepPx = floor(my.vwidth / my.nstep);
  my.stepPx = floor(my.vheight / my.nstep);
  my.innerPx = floor(my.stepPx * (1 - my.margin));
  my.crossWt = my.stepPx - my.innerPx;
  my.byPixel = my.nstep < 16;
  my.byLine = my.nstep >= 16;
}

function nstep_update(n) {
  // console.log('nstep_update n', n);
  my.nstep = n;
  nstep_init();
  my.nstep_selection.selected(my.nstep);
}
