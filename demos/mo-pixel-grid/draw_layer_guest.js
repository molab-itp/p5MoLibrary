// incrementally draw grid of pixel rects from given image img
function draw_layer_guest(img) {
  let layer = my.layer;
  more = 1;
  let colr;
  while (more) {
    if (my.showVideo) {
      colr = img.get(my.vx, my.vy);
    } else {
      colr = [0, 0, 0];
    }
    my.colr = colr;
    layer.fill(colr);
    layer.noStroke();
    layer.rect(my.vx, my.vy, my.innerPx, my.innerPx);
    // draw_record_rect(colr, my.vx, my.vy, my.innerPx, my.innerPx);
    draw_record_rect(colr, my.vxi);
    if (!my.run) {
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

  // draw layer to canvas
  image(layer, 0, 0);

  // Draw cross-hair
  if (!my.byLine) {
    strokeWeight(my.crossWt);
    stroke(colr);
    let x = my.vx + my.innerPx / 2;
    let y = my.vy + my.innerPx / 2;
    line(x, 0, x, my.height);
    line(0, y, my.width, y);
  }
}

// layer.fill(colr);
// layer.rect(my.vx, my.vy, my.innerPx, my.innerPx);
// function draw_record_rect(c, x, y, w, h) {
function draw_record_rect(c, ix) {
  if (my.store) {
    // let op = { r: 1, c, x, y, w, h };
    // my.pixRow.push(op);
    let item = { c };
    my.pixRow[ix] = item;
  }
}

function draw_record_flush(irow) {
  if (my.store) {
    dstore_pix_update(irow, my.pixRow);
  }
  // my.pixRow = [];
}
