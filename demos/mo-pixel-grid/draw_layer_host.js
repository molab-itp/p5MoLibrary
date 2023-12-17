// incrementally draw grid of pixel rects from given image img
function draw_layer_host(img) {
  let pixs = my.receivedPixs;
  if (!pixs) return;
  let layer = my.layer;
  more = 1;
  let colr;
  while (more) {
    // colr = img.get(my.vx, my.vy);
    let row = pixs[my.vyi];
    if (!row) {
      console.log('no my.vyi', my.vyi);
      break;
    }
    // console.log('row', row);
    let item = row.ops[my.vxi];
    if (!item) {
      console.log('no my.vxi', my.vxi, 'my.vyi', my.vyi);
      break;
    }
    //   "ops": [ {
    //           "c": [ 75, 74, 79, 255 ],
    //           "h": 54, "r": 1, "w": 54, "x": 0, "y": 0
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
    layer.rect(item.x, item.y, item.w, item.h);
    // if (!my.run) {
    //   break;
    // }
    my.vx += my.stepPx;
    my.vxi += 1;
    if (my.vxi >= row.ops.length) {
      my.vx = 0;
      my.vxi = 0;
      my.vy += my.stepPx;
      my.vyi += 1;
      if (my.vyi >= pixs.length) {
        more = 0;
        my.vy = 0;
        my.vyi = 0;
      }
    }
  }

  // console.log('1 colr', colr, typeof colr);

  // draw layer to canvas
  image(layer, 0, 0);
}
