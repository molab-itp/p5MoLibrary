//
// incrementally draw grid of pixel rects from storage
function dstore_received() {
  // console.log('dstore_received my.stored_devices', my.stored_devices);
  // let layer = my.layer;
  if (!my.stored_devices) {
    return;
  }
  my.x0 = 0;
  my.y0 = 0;
  // Render my pix first
  if (my.uid) {
    dstore_received_uid(my.uid);
  }
  for (let uid in my.stored_devices) {
    // console.log('dstore_received ub_uid', uid);
    if (uid != my.uid) {
      dstore_received_uid(uid);
    }
    // console.log('dstore_received my.y0', my.y0);
    if (my.y0 >= height) {
      break;
    }
  }
}

function dstore_received_uid(uid) {
  // console.log('dstore_received_uid uid', uid, my.x0, my.y0);
  dstore_received_image(uid);
  my.x0 += my.vwidth;
  if (my.x0 >= width) {
    my.x0 = 0;
    my.y0 += my.vheight;
  }
}

function dstore_received_image(uid) {
  let device = my.stored_devices[uid];
  // console.log('dstore_received device', device);
  if (!device) return;

  let pixs = device.pixgrids;
  dstore_received_device(device, pixs);

  image(device.layer, my.x0, my.y0);

  dstore_received_cross(device, uid);

  image(device.crossLayer, my.x0, my.y0);
}

function dstore_received_device(device, pixs) {
  if (!pixs) return;
  // console.log('dstore_received_device pix n', pixs.length);
  if (pixs.length <= 0) return;
  let layer = device.layer;
  let nstep = pixs.length;
  let stepPx = floor(my.vheight / nstep);
  let innerPx = floor(stepPx * (1 - my.margin));
  more = 1;
  let vyi = 0;
  let vxi = 0;
  while (more) {
    let pix = pixs[vyi];
    if (!pix) {
      console.log('dstore_received_device no vyi', vyi);
      vyi = 0;
      break;
    }
    // console.log('dstore_received_device pix', pix);
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
      console.log('dstore_received_device no colr vxi', vxi, 'vyi', vyi);
      break;
    }
    // console.log('dstore_received_device colr', colr, typeof colr);
    let x = vxi * stepPx;
    let y = vyi * stepPx;
    // console.log('dstore_received_device x', x, y);

    dstore_received_shape(layer, x, y, colr, innerPx);
    vxi += 1;
    if (vxi >= pix.row.length) {
      vxi = 0;
      vyi += 1;
      if (vyi >= pixs.length) {
        // If we have reached the end of the pixel grid for our device
        // advance to next nstep
        // if (device.uid == my.uid) {
        //   console.log('dstore_received_device vyi', vyi);
        //   nstepIndex_update();
        // }
        more = 0;
        vyi = 0;
      }
    }
  }
}

function dstore_received_cross(device, uid) {
  let crossLayer = device.crossLayer;
  crossLayer.clear();
  if (!dstore_device_isActive(device)) {
    return;
  }
  // Draw the chip on layer that persists
  let chip = device.pixchips;
  // let chip = device.serverValues.chip;
  if (!chip) {
    return;
  }

  let stepPx = chip.s;
  let colr = chip.c;
  let x = chip.x * stepPx;
  let y = chip.y * stepPx;
  let innerPx = floor(stepPx * (1 - my.margin));
  dstore_received_shape(device.layer, x, y, colr, innerPx);

  // Draw the cross hairs on cleared crossLayer
  x = floor(x + innerPx * 0.5);
  y = floor(y + innerPx * 0.5);

  let crossWt = stepPx - innerPx;
  crossLayer.strokeWeight(crossWt);
  crossLayer.stroke(colr);
  crossLayer.line(x, 0, x, my.vheight);
  crossLayer.line(0, y, my.vwidth, y);
}

function dstore_received_shape(layer, x, y, colr, innerPx) {
  layer.fill(colr);
  layer.noStroke();
  // console.log('dstore_received_shape x', x, y);
  let ww = innerPx;
  let hh = innerPx;
  let ns = my.shapeIndex % 4;
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
