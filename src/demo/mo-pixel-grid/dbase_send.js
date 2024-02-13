// incrementally draw grid of pixel rects from given image img
function dbase_send(img) {
  // console.log('dbase_send img', img);
  if (!img) return;
  dbase_send_image(img);
}

function dbase_send_image(img) {
  // console.log('dbase_send_image img', img);
  more = 1;
  let colr;
  let cx = floor(my.stepPx * 0.5);
  let cy = floor(my.stepPx * 0.5);
  while (more) {
    let vx = my.send_xi * my.stepPx;
    let vy = my.send_yi * my.stepPx;
    if (my.videoFlag) {
      colr = img.get(vx + cx, vy + cy);
    } else {
      colr = [0, 0, 0];
    }
    draw_record_rect(my.send_xi, my.send_yi, colr);
    my.send_xi += 1;
    vx = my.send_xi * my.stepPx;
    if (vx >= my.vwidth) {
      draw_record_flush(my.send_yi);
      my.send_xi = 0;
      my.send_yi += 1;
      vy = my.send_yi * my.stepPx;
      if (vy >= my.vheight) {
        more = 0;
        my.send_yi = 0;
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
  // console.log('draw_record_rect ix', ix, 'iy', iy, 'c', c);
  if (my.storeFlag) {
    // let op = { r: 1, c, x, y, w, h };
    if (!my.pixRows) {
      my.pixRows = [];
    }
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
    dbase_pixgrid_update(irow, my.stepPx, my.pixRows[irow]);
  }
}
