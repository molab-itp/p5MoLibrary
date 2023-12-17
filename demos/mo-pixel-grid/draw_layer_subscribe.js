// incrementally draw grid of pixel rects from given image img
function draw_layer_subscribe() {
  let pixs = my.receivedPixs;
  if (!pixs) return;
  let layer = my.layer;
  more = 1;
  let colr;
  while (more) {
    // colr = img.get(my.vx, my.vy);
    let pix = pixs[my.vyi];
    if (!pix) {
      console.log('no my.vyi', my.vyi);
      break;
    }
    // console.log('pix', pix);
    let item = pix.row[my.vxi];
    if (!item) {
      console.log('no my.vxi', my.vxi, 'my.vyi', my.vyi);
      break;
    }
    //   "row": [ {
    //           "c": [ 75, 74, 79, 255 ],
    //       },

    // console.log('item', item);
    let colr = item.c;
    if (!colr) {
      console.log('no colr my.vxi', my.vxi, 'my.vyi', my.vyi);
      break;
    }
    // console.log('colr', colr, typeof colr);
    my.colr = colr;
    layer.fill(colr);
    layer.noStroke();
    // layer.rect(my.vx, my.vy, my.innerPx, my.innerPx);
    // layer.rect(item.x, item.y, item.w, item.h);
    let x = my.vxi * my.stepPx;
    let y = my.vyi * my.stepPx;
    // let w = my.innerPx;
    // let h = my.innerPx;
    // layer.rect(x, y, w, h);
    draw_shape(x, y);
    // my.vx += my.stepPx;
    my.vxi += 1;
    if (my.vxi >= pix.row.length) {
      // my.vx = 0;
      my.vxi = 0;
      // my.vy += my.stepPx;
      my.vyi += 1;
      if (my.vyi >= pixs.length) {
        more = 0;
        // my.vy = 0;
        my.vyi = 0;
      }
    }
  }

  function draw_shape(x, y) {
    // console.log('draw_shape my.pub_index', my.pub_index);
    let ww = my.innerPx;
    let hh = my.innerPx;
    let ns = my.pub_index % 3;
    if (ns == 0) {
      layer.rect(x, y, ww, hh);
    } else if (ns == 1) {
      layer.ellipse(x + ww / 2, y + hh / 2, ww, hh);
    } else {
      // triangle(x1, y1, x2, y2, x3, y3)
      let x1 = x + ww / 2;
      let y1 = y;
      let x2 = x;
      let y2 = y + hh;
      let x3 = x + ww;
      let y3 = y2;
      layer.triangle(x1, y1, x2, y2, x3, y3);
    }
  }
  // console.log('1 colr', colr, typeof colr);

  // draw layer to canvas
  image(layer, 0, 0);
}
