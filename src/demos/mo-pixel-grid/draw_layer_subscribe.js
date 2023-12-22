// incrementally draw grid of pixel rects from storage
function draw_layer_subscribe() {
  // console.log('draw_layer_subscribe my.stored_agent', my.stored_agent);
  // let layer = my.layer;
  if (!my.stored_agent) {
    return;
  }
  my.x0 = 0;
  my.y0 = 0;
  if (my.uid) draw_sub_uid(my.uid);
  for (let sub_uid in my.stored_agent) {
    // console.log('draw_layer_subscribe ub_uid', sub_uid);
    if (sub_uid != my.uid) draw_sub_uid(sub_uid);
  }
}

function draw_sub_uid(sub_uid) {
  let agentEnt = my.stored_agent[sub_uid];
  // console.log('draw_layer_subscribe agentEnt', agentEnt);
  if (!agentEnt) return;
  // console.log('draw_layer_subscribe agentEnt', agentEnt);
  let layer = agentEnt.layer;
  if (!layer) return;
  if (my.stored_pixs) {
    let pixs = my.stored_pixs[sub_uid];
    // console.log('sub_uid', sub_uid, 'pix', pix);
    if (!pixs) {
      // console.log('sub_uid', sub_uid, 'pixs', pixs);
      return;
    }
    console.log('sub_uid', sub_uid, 'pix n', pixs.length);
    // layer.clear();
    draw_layer_pix_layer(layer, pixs);
    // draw layer to canvas
  }
  image(layer, my.x0, my.y0);

  my.x0 += my.vwidth;
  if (my.x0 > width) {
    my.x0 = 0;
    my.y0 += my.vheight;
  }
}

function draw_layer_pix_layer(layer, pixs) {
  if (!pixs) return;
  let stepPx = floor(my.vheight / pixs.length);
  let innerPx = floor(stepPx * (1 - my.margin));
  more = 1;
  let vyi = 0;
  let vxi = 0;
  while (more) {
    let pix = pixs[vyi];
    if (!pix) {
      console.log('no vyi', vyi);
      vyi = 0;
      // continue;
      break;
    }
    // console.log('pix', pix);
    let item = pix.row[vxi];
    if (!item) {
      // console.log('no vxi', vxi, 'vyi', vyi);
      break;
    }
    // console.log('item', item);
    let colr = item.c;
    if (!colr) {
      // console.log('no colr vxi', vxi, 'vyi', vyi);
      break;
    }
    // console.log('colr', colr, typeof colr);
    // my.videoColor = colr;
    // colr[3] = 50;
    layer.fill(colr);
    layer.noStroke();
    let x = vxi * stepPx;
    let y = vyi * stepPx;
    draw_sub_shape(layer, x, y, innerPx);
    vxi += 1;
    if (vxi >= pix.row.length) {
      vxi = 0;
      vyi += 1;
      if (vyi >= pixs.length) {
        more = 0;
        vyi = 0;
      }
    }
  }

  // console.log('1 colr', colr, typeof colr);
}

function draw_sub_shape(layer, x, y, innerPx) {
  // console.log('draw_shape my.sub_index', my.sub_index);
  let ww = innerPx;
  let hh = innerPx;
  let ns = my.sub_index % 4;
  if (ns == 0) {
    layer.rect(x, y, ww, hh);
  } else if (ns == 1) {
    layer.ellipse(x + ww / 2, y + hh / 2, ww, hh);
  } else if (ns == 2) {
    // triangle(x1, y1, x2, y2, x3, y3)
    let x1 = x + ww / 2;
    let y1 = y;
    let x2 = x;
    let y2 = y + hh;
    let x3 = x + ww;
    let y3 = y2;
    layer.triangle(x1, y1, x2, y2, x3, y3);
  } else {
    // triangle(x1, y1, x2, y2, x3, y3)
    let x1 = x + ww / 2;
    let y1 = y + hh;
    let x2 = x;
    let y2 = y;
    let x3 = x + ww;
    let y3 = y2;
    layer.triangle(x1, y1, x2, y2, x3, y3);
  }
}
