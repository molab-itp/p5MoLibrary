function draw_walker_random() {
  let x = my.walker.x;
  let y = my.walker.y;

  let c = my.video.get(x, y);
  add_item({ x, y, c, r: 1 });

  // x = x + random(-my.brushSize, my.brushSize);
  // y = y + random(-my.brushSize, my.brushSize);
  let bz = my.brushSize * 2;
  x = x + bz * random([-1, 0, 1]);
  y = y + bz * random([-1, 0, 1]);
  my.walker.x = (x + my.width) % my.width;
  my.walker.y = (y + my.height) % my.height;

  my.walker.x = my.x;
}

function draw_grid_scan1_right() {
  let { x, y } = my;
  let more = 1;
  let img = my.video.get();
  while (more) {
    let c = img.get(x, y);
    my.layer.noStroke();
    my.layer.fill(c);
    my.layer.rect(x, y, my.brushSize, my.brushSize);
    y += my.brushSize;
    if (y > my.height) {
      more = 0;
      y = 0;
      x += my.brushSize;
      if (x > my.width) {
        x = 0;
      }
    }
  }
  my.x = x;
  my.y = y;
}

function draw_grid_scan_spiral() {
  if (!my.spiralPoints) {
    let props = {
      width: my.width,
      height: my.height,
      d: 10,
    };
    let spiral = new SpiralWalker(props);
    my.spiralPoints = spiral.points();
    my.spiralIndex = 0;
  }
  let ent = my.spiralPoints[my.spiralIndex];
  my.spiralIndex = (my.spiralIndex + 1) % my.spiralPoints.length;
  let x = ent[0];
  let y = ent[1];
  let c = my.video.get(x, y);
  my.layer.noStroke();
  my.layer.fill(c);
  my.layer.rect(x, y, my.brushSize, my.brushSize);
  x += my.brushSize;
  if (x > my.width) {
    x = 0;
    y += my.brushSize;
    if (y > my.height) {
      y = 0;
    }
  }
  my.x = x;
  my.y = y;
}

function draw_grid_scan1_down() {
  let { x, y } = my;
  let more = 1;
  let img = my.video.get();
  while (more) {
    let c = img.get(x, y);
    my.layer.noStroke();
    my.layer.fill(c);
    my.layer.rect(x, y, my.brushSize, my.brushSize);
    x += my.brushSize;
    if (x > my.width) {
      more = 0;
      x = 0;
      y += my.brushSize;
      if (y > my.height) {
        y = 0;
      }
    }
  }
  my.x = x;
  my.y = y;
}

function draw_grid_scan1() {
  let { x, y } = my;
  let c = my.video.get(x, y);
  my.layer.noStroke();
  my.layer.fill(c);
  my.layer.rect(x, y, my.brushSize, my.brushSize);
  x += my.brushSize;
  if (x > my.width) {
    x = 0;
    y += my.brushSize;
    if (y > my.height) {
      y = 0;
    }
  }
  my.x = x;
  my.y = y;
}

function draw_grid_random_walk() {
  let { x, y } = my;
  let c = my.video.get(x, y);
  my.layer.noStroke();
  my.layer.fill(c);
  my.layer.rect(x, y, my.brushSize, my.brushSize);
  x += my.brushSize * random([-1, 0, 1]);
  y += my.brushSize * random([-1, 0, 1]);
  if (x < 0) x = 0;
  let rt = my.width - my.brushSize;
  if (x > rt) x = rt;
  if (y < 0) y = 0;
  let bt = my.height - my.brushSize;
  if (y > bt) y = bt;
  my.x = x;
  my.y = y;
}
