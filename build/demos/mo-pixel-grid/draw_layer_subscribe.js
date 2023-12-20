// incrementally draw grid of pixel rects from storage
function draw_layer_subscribe() {
  let pixs = dstore_receivedPixs();
  if (!pixs) return;
  let layer = my.layer;
  more = 1;
  while (more) {
    let pix = pixs[my.vyi];
    if (!pix) {
      console.log('no my.vyi', my.vyi);
      my.vyi = 0;
      // continue;
      break;
    }
    // console.log('pix', pix);
    let item = pix.row[my.vxi];
    if (!item) {
      console.log('no my.vxi', my.vxi, 'my.vyi', my.vyi);
      break;
    }
    // console.log('item', item);
    let colr = item.c;
    if (!colr) {
      console.log('no colr my.vxi', my.vxi, 'my.vyi', my.vyi);
      break;
    }
    // console.log('colr', colr, typeof colr);
    // my.videoColor = colr;
    // colr[3] = 50;
    layer.fill(colr);
    layer.noStroke();
    let x = my.vxi * my.stepPx;
    let y = my.vyi * my.stepPx;
    draw_shape(x, y);
    my.vxi += 1;
    if (my.vxi >= pix.row.length) {
      my.vxi = 0;
      my.vyi += 1;
      if (my.vyi >= pixs.length) {
        more = 0;
        my.vyi = 0;
      }
    }
  }

  function draw_shape(x, y) {
    // console.log('draw_shape my.sub_index', my.sub_index);
    let ww = my.innerPx;
    let hh = my.innerPx;
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
  // console.log('1 colr', colr, typeof colr);

  // draw layer to canvas
  // image(layer, 0, 0);
}
