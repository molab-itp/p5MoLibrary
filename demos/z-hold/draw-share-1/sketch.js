// https://editor.p5js.org/jht9629-nyu/sketches/mCr2W68mc
// draw-share-multi

let a_version = 'v2 ';
let galleryKey = 'mo-draw-web-shared';

let max_points = 200;
let nitems = 0;
let updateCount = 0;
let debug = 0;

let points = [];
let cnv;
let galleryRef;
let rdata;
let brush_size = 10;
let min_drag = brush_size / 2;

let clearBtn;

function setup() {
  cnv = createCanvas(393, 600);
  cnv.mousePressed(canvas_mousePressed);
  cnv.mouseReleased(canvas_mouseReleased);

  gallery_onValue();

  signin();

  strokeWeight(brush_size);

  ui_update();

  createP();

  clearBtn = createButton('Clear').mousePressed(gallery_clear);
  clearBtn.style('font-size:42px');
}

function draw() {
  background(200);

  for (let index = 1; index < points.length; index++) {
    let p1 = points[index - 1];
    let p2 = points[index];
    if (p1.break || p2.break) continue;
    line(p1.x, p1.y, p2.x, p2.y);
  }
}

function mouseDragged() {
  // console.log('mouseDragged');
  let x = mouseX;
  let y = mouseY;
  if (points.length > 0) {
    let opt = points[points.length - 1];
    if (!opt.break) {
      if (dist(opt.x, opt.y, x, y) < min_drag) {
        return;
      }
    }
  }
  add_item({ x, y });
  // required to prevent touch drag moving canvas on mobile
  return false;
}

function add_item(item) {
  points.push(item);
  if (points.length > max_points) {
    points.splice(0, 1);
  }
}

function write_points() {
  add_item({ break: 1 });
  fb_.set(galleryRef, {
    now: new Date().toISOString(),
    points: points,
  });
}

function canvas_mousePressed() {
  console.log('canvas_mousePressed');
}

function canvas_mouseReleased() {
  console.log('canvas_mouseReleased');
  write_points();
}

function signin() {
  fb_
    .signInAnonymously(fb_.auth)
    .then(() => {
      console.log('signin OK');
      // read_points();
    })
    .catch((error) => {
      console.log('signin error', error);
    });
}

function gallery_clear() {
  points = [];
  fb_.set(galleryRef, {});
}

function gallery_onValue() {
  // Setup listener for changes to firebase db
  galleryRef = fb_.ref(fb_.database, galleryKey);
  fb_.onValue(galleryRef, received_snap);
}

function received_snap(snapshot) {
  // console.log('received_gallery data', data);
  const data = snapshot.val();
  console.log('received_gallery data', data);
  rdata = data;
  updateCount += 1;
  if (rdata && rdata.points) {
    points = rdata.points;
    nitems = points.length;
  }
  ui_update();
}

function ui_update() {
  ui_span('date', a_version + formatDate());
  ui_span('updateCount', ' updateCount:' + updateCount);
  ui_span('nitems', ' nitems:' + nitems);
}

function formatDate() {
  return new Date().toISOString();
}

function ui_span(id, html) {
  let span = select('#' + id);
  if (document.fullscreenElement) {
    if (span) {
      span.remove();
    }
    return;
  }
  if (!span) {
    span = createSpan().id(id);
  }
  span.html(html);
}

// https://editor.p5js.org/jht9629-nyu/sketches/fEp51pBhA
// draw-share
