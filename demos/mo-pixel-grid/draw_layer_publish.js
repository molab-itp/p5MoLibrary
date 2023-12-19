// incrementally draw grid of pixel rects from given image img
function draw_layer_publish(img) {
  let layer = my.layer;
  more = 1;
  let colr;
  // let rx = floor(random(0, my.stepPx));
  // let ry = floor(random(0, my.stepPx));
  let rx = floor(my.stepPx * 0.5);
  let ry = floor(my.stepPx * 0.5);
  while (more) {
    if (my.videoFlag) {
      colr = img.get(my.vx + rx, my.vy + ry);
    } else {
      colr = [0, 0, 0];
    }
    my.videoColor = colr;
    layer.fill(colr);
    layer.noStroke();
    layer.rect(my.vx, my.vy, my.innerPx, my.innerPx);
    // draw_record_rect(colr, my.vx, my.vy, my.innerPx, my.innerPx);
    draw_record_rect(colr, my.vxi, my.vyi);
    if (!my.runFlag) {
      if (my.track_xy_updated) {
        draw_record_flush(my.vyi);
        my.track_xy_updated = 0;
      }
      break;
    }
    my.vx += my.stepPx;
    my.vxi += 1;
    if (my.vx >= my.vwidth) {
      draw_record_flush(my.vyi);
      my.vx = 0;
      my.vxi = 0;
      my.vy += my.stepPx;
      my.vyi += 1;
      if (my.vy >= my.vheight) {
        more = 0;
        my.vy = 0;
        my.vyi = 0;
      }
      if (my.byLine) {
        more = 0;
      }
    }
    if (!my.byLine) {
      more = 0;
    }
  }
}

// layer.fill(colr);
// layer.rect(my.vx, my.vy, my.innerPx, my.innerPx);
// function draw_record_rect(c, x, y, w, h) {
function draw_record_rect(c, ix, iy) {
  if (my.storeFlag) {
    // let op = { r: 1, c, x, y, w, h };
    // my.pixRows.push(op);
    let row = my.pixRows[iy];
    if (!row) {
      row = [];
      my.pixRows[iy] = row;
    }
    let item = { c };
    row[ix] = item;
  }
}

function draw_record_flush(irow) {
  if (my.storeFlag) {
    dstore_pix_update(irow, my.pixRows[irow]);
  }
}
