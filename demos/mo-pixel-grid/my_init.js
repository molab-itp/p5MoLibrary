function my_init() {
  init_query();
  my.layer = createGraphics(my.width, my.height);
  // my.vx = 0;
  // my.vy = 0;
  // my.vxi = 0;
  // my.vyi = 0;

  my.pixRow = [];
  my.colr = [0, 0, 0];
  my.uid = -1;
  my.pub_uid = -1;
  if (my.scrollOnStart) {
    ui_toggle_scroll();
  }
  init_nstep();
}

function init_query() {
  my.query = get_url_params();
  if (my.query) {
    my.guestName = my.query.g;
    my.hostName = my.query.h;
    my.nstep = my.query.nstep || my.nstep;
    my.perFrame = my.query.perFrame || my.perFrame;
    my.byLine = my.query.byLine || my.byLine;
  }
  if (my.hostName) {
    my.draw_func = draw_host;
    my.width = displayWidth;
    my.height = displayHeight;
    my.host = 1;
  } else {
    my.draw_func = draw_guest;
    my.width = my.vwidth;
    my.height = my.vheight;
    my.host = 0;
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

// !!@ Move to lib
// return null or url query as object
// eg. query='abc=foo&def=%5Basf%5D&xyz=5'
// params={abc: "foo", def: "[asf]", xyz: "5"}
function get_url_params() {
  let query = window.location.search;
  // console.log('query |' + query + '|');
  console.log('get_url_params query.length=', query.length);
  if (query.length < 1) return null;
  let params = params_query(query);
  console.log('get_url_params params=', params);
  return params;
  // let store = params['store'];
  // console.log('nstore', store);
  // return store;
}

// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
function params_query(query) {
  // eg. query='abc=foo&def=%5Basf%5D&xyz=5'
  // params={abc: "foo", def: "[asf]", xyz: "5"}
  const urlParams = new URLSearchParams(query);
  const params = Object.fromEntries(urlParams);
  return params;
}
