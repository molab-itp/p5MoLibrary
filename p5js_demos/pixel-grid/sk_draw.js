function draw_layer(img) {
  let layer = my.layer;
  more = 1;
  let colr;
  while (more) {
    colr = img.get(my.vx, my.vy);
    my.colr = colr;
    layer.fill(colr);
    layer.noStroke();
    layer.rect(my.vx, my.vy, my.innerPx, my.innerPx);
    draw_record_rect(colr, my.vx, my.vy, my.innerPx, my.innerPx);
    if (!my.run) {
      break;
    }
    my.vx += my.stepPx;
    if (my.vx > my.vwidth) {
      my.vx = 0;
      my.vy += my.stepPx;
      if (my.vy > my.vheight) {
        more = 0;
        my.vy = 0;
      }
      if (my.byLine) {
        more = 0;
      }
      draw_record_flush(my.vy);
    }
    if (my.byPixel) {
      more = 0;
    }
  }
  image(layer, 0, 0);

  // Draw cross-hair
  strokeWeight(my.crossWt);
  stroke(colr);
  let x = my.vx + my.innerPx / 2;
  let y = my.vy + my.innerPx / 2;
  line(x, 0, x, my.height);
  line(0, y, my.width, y);
}

// layer.fill(colr);
// layer.rect(my.vx, my.vy, my.innerPx, my.innerPx);
function draw_record_rect(c, x, y, w, h) {
  if (my.store) {
    let op = { r: 1, c, x, y, w, h };
    my.drawOps.push(op);
  }
}

function draw_record_flush(seq) {
  if (my.store) {
    dstore_pix_update(seq, my.drawOps);
  }
  my.drawOps = [];
}
