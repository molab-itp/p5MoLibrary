// incrementally draw grid of pixel rects from given image img
function draw_publish(img) {
  // console.log('draw_publish img', img);
  if (!img) return;
  draw_publish_layer(my.publishLayer, img);
  // image(layer, 0, 0);
}

function draw_publish_layer(layer, img) {
  console.log('draw_publish_layer layer', layer, 'img', img);
  more = 1;
  let colr;
  let cx = floor(my.stepPx * 0.5);
  let cy = floor(my.stepPx * 0.5);
  while (more) {
    if (my.videoFlag) {
      colr = img.get(my.vx + cx, my.vy + cy);
    } else {
      colr = [0, 0, 0];
    }
    console.log('draw_publish_layer my.vxi', my.vxi, 'my.vyi', my.vyi, 'colr', colr);

    layer.fill(colr);
    layer.noStroke();
    layer.rect(my.vx, my.vy, my.innerPx, my.innerPx);
    draw_record_rect(my.vxi, my.vyi, colr);
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
    if (my.byPixel) {
      more = 0;
    }
  }
}

function draw_record_rect(ix, iy, c) {
  console.log('draw_record_rect ix', ix, 'iy', iy, 'c', c);
  if (my.storeFlag) {
    // let op = { r: 1, c, x, y, w, h };
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
  if (my.storeFlag && irow >= 0) {
    dstore_pix_update(irow, my.pixRows[irow]);
  }
}
