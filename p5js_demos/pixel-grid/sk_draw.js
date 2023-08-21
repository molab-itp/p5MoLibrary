function draw_layer(img) {
  let layer = my.layer;
  more = 1;
  let col;
  while (more) {
    col = img.get(my.vx, my.vy);
    layer.fill(col);
    layer.noStroke();
    layer.rect(my.vx, my.vy, my.rr, my.rr);
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
    }
    if (my.byPixel) {
      more = 0;
    }
  }
  image(layer, 0, 0);

  // Draw cross-hair
  strokeWeight(my.crossWt);
  stroke(col);
  let x = my.vx + my.rr / 2;
  let y = my.vy + my.rr / 2;
  line(x, 0, x, my.height);
  line(0, y, my.width, y);
}
