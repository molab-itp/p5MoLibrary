// incrementally draw grid of pixel rects from storage
function draw_received() {
  // console.log('draw_received my.stored_device', my.stored_device);
  // let layer = my.layer;
  if (!my.stored_device) {
    return;
  }
  my.x0 = 0;
  my.y0 = 0;
  // Render my pix first
  if (my.uid) {
    draw_received_uid(my.uid);
  }
  for (let uid in my.stored_device) {
    // console.log('draw_received ub_uid', uid);
    if (uid != my.uid) {
      draw_received_uid(uid);
    }
  }
}

function draw_received_uid(uid) {
  draw_received_image(uid);
  my.x0 += my.vwidth;
  if (my.x0 > width) {
    my.x0 = 0;
    my.y0 += my.vheight;
  }
}

function draw_received_image(uid) {
  let deviceEnt = my.stored_device[uid];
  // console.log('draw_received deviceEnt', deviceEnt);
  if (!deviceEnt) return;
  if (my.stored_pixs) {
    let pixs = my.stored_pixs[uid];
    // console.log('uid', uid, 'pixs', pixs);
    if (pixs) {
      // console.log('draw_received_image uid', uid, 'pix n', pixs.length);
      draw_received_deviceEnt(deviceEnt, pixs);
    }
  }
  image(deviceEnt.layer, my.x0, my.y0);
  draw_received_cross(deviceEnt);
  image(deviceEnt.crossLayer, my.x0, my.y0);
}

function draw_received_cross(deviceEnt) {
  let crossLayer = deviceEnt.crossLayer;
  crossLayer.clear();
  if (!dstore_device_isActive(deviceEnt)) {
    return;
  }
  // Draw the chip on layer that persists
  let chip = deviceEnt.serverValues.chip;
  let stepPx = chip.s;
  let x = chip.x * stepPx;
  let y = chip.y * stepPx;
  let colr = chip.c;
  let innerPx = floor(stepPx * (1 - my.margin));
  draw_received_shape(deviceEnt.layer, x, y, colr, innerPx);

  // Draw the cross hairs on cleared crossLayer
  x = floor(x + innerPx * 0.5);
  y = floor(y + innerPx * 0.5);

  let crossWt = chip.s - innerPx;
  crossLayer.strokeWeight(crossWt);
  crossLayer.stroke(colr);
  crossLayer.line(x, 0, x, my.vheight);
  crossLayer.line(0, y, my.vwidth, y);
}

function draw_received_deviceEnt(deviceEnt, pixs) {
  let layer = deviceEnt.layer;
  if (!pixs) return;
  // console.log('draw_received_deviceEnt pix n', pixs.length);
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
      break;
    }
    // console.log('pix', pix);
    if (pix.s) {
      stepPx = pix.s;
      innerPx = floor(stepPx * (1 - my.margin));
    }
    let item = pix.row[vxi];
    if (!item) {
      console.log('no vxi', vxi, 'vyi', vyi);
      break;
    }
    // console.log('item', item);
    let colr = item.c;
    if (!colr) {
      console.log('no colr vxi', vxi, 'vyi', vyi);
      break;
    }
    // console.log('draw_received_deviceEnt colr', colr, typeof colr);
    let x = vxi * stepPx;
    let y = vyi * stepPx;
    // console.log('draw_received_deviceEnt x', x, y);

    draw_received_shape(layer, x, y, colr, innerPx);
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

function draw_received_shape(layer, x, y, colr, innerPx) {
  layer.fill(colr);
  layer.noStroke();
  // console.log('draw_received_shape x', x, y);
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
    let x1 = x + ww / 2;
    let y1 = y + hh;
    let x2 = x;
    let y2 = y;
    let x3 = x + ww;
    let y3 = y2;
    layer.triangle(x1, y1, x2, y2, x3, y3);
  }
}
