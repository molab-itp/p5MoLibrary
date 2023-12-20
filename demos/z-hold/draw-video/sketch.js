// https://editor.p5js.org/jht9629-nyu/sketches/L5Vr53NQl
// draw-video

let my = {
  version: 24,
  galleryKey: 'mo-draw-web-shared',
  maxPoints: 200,
  vwidth: 480, // Aspect ratio of video capture
  vheight: 640,
  face: true, // camera face front or back
  brushSize: 10,
  drawVideo: 1,
  drawGrid: 1,
  drawWalker: 1,
};

function setup() {
  my_init();

  // my.canv = createCanvas(393, 600);
  my.canv = createCanvas(my.width, my.height);
  my.canv.mouseReleased(canvas_mouseReleased);
  my.canv.touchEnded(canvas_mouseReleased);

  gallery_signin();

  gallery_onValue();

  ui_init();

  video_create();
}

function draw() {
  if (!video_ready()) return;

  if (my.drawVideo) {
    let img = my.video.get();
    img.filter(GRAY);
    image(img, 0, 0);
  }

  if (my.drawGrid) {
    draw_grid_scan_right();
  }

  draw_points();

  if (my.drawWalker) {
    draw_walker_scan();
  }

  image(my.layer_scan, 0, 0);
  image(my.layer_walker, 0, 0);
}

function my_init() {
  my.nitems = 0;
  my.updateCount = 0;
  my.points = [];

  // match canvas to video dimensions
  my.width = my.vwidth;
  my.height = my.vheight;

  my.x = floor(my.width / 2);
  my.y = floor(my.height / 2);

  my.min_drag = my.brushSize / 2;

  my.layer_scan = createGraphics(my.width, my.height);
  my.layer_scan.clear();

  my.layer_walker = createGraphics(my.width, my.height);
  my.layer_walker.clear();

  my.walker = {};
  my.walker.y0 = floor(my.height * 0.333);
  my.walker.y1 = floor(my.height * 0.666);
  my.walker.y = my.walker.y0;
  my.walker.x = my.x;
  // my.walker.x = 0;
  // my.walker.y = 0;

  my.scanPhase = 0;
}

function draw_points() {
  for (let index = 1; index < my.points.length; index++) {
    let p1 = my.points[index - 1];
    let p2 = my.points[index];
    if (p1.break || p2.break) continue;
    let c = p1.c || 0;
    let layer = my.layer_walker;
    if (p1.r != undefined) {
      layer.noStroke();
      layer.fill(c);
      layer.rect(p1.x, p1.y, my.brushSize, my.brushSize * 2);
    } else {
      layer.strokeWeight(my.brushSize);
      layer.stroke(c);
      layer.line(p1.x, p1.y, p2.x, p2.y);
    }
  }
}

function mouseDragged() {
  // console.log('mouseDragged');
  let x = mouseX;
  let y = mouseY;
  if (my.points.length > 0) {
    let ppt = my.points[my.points.length - 1];
    if (!ppt.break) {
      if (dist(ppt.x, ppt.y, x, y) < my.min_drag) {
        return;
      }
    }
  }
  let c = my.video.get(x, y);
  add_item({ x, y, c });

  // required to prevent touch drag moving canvas on mobile
  return false;
}

function canvas_mouseReleased() {
  console.log('canvas_mouseReleased');
  write_points();
}

function draw_walker_scan() {
  let x = my.walker.x;
  let y = my.walker.y;
  let more = 1;
  let img = my.video.get();
  while (more) {
    let c = img.get(x, y);
    add_item({ x, y, c, r: 1 });
    more = 0;
    x += 1;
    if (x > my.width) {
      x = 0;
      more = 0;
      y += my.brushSize;
      if (y > my.walker.y1) {
        y = my.walker.y0;
      }
    }
  }
  my.walker.x = x;
  my.walker.y = y;
}

function draw_grid_scan_right() {
  let w = my.video.width;
  let h = my.video.height;
  let sx = w / 2;
  let sy = 0;
  let sw = 1;
  let sh = h;
  let dx = my.x;
  let dy = 0;
  let dw = 1;
  let dh = height;
  let layer = my.layer_scan;
  layer.copy(my.video, sx, sy, sw, sh, dx, dy, dw, dh);
  // copy(video, w/2, 0, 1, h, x, 0, 1, h);
  if (my.scanPhase) {
    layer.erase();
    layer.noStroke();
    layer.fill(255);
    layer.rect(dx, dy, dw, dh / 2);
    layer.noErase();
  }

  my.x = my.x + 1;
  if (my.x > width) {
    my.x = 0;
    my.scanPhase = (my.scanPhase + 1) % 2;
  }
}

// [] consider acceleromitor for scan up down

// 2023-08-14 jht: Convert to my variable references

// https://editor.p5js.org/jht9629-nyu/sketches/uKHKJ1yqX
// show-video-jitter

// # --
// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0

// https://editor.p5js.org/jht9629-nyu/sketches/fEp51pBhA
// draw-share
