// https://editor.p5js.org/jht9629-nyu/sketches/mCr2W68mc
// draw-share-multi

let my = {
  version: 'v6 ',
  galleryKey: 'mo-draw-web-shared',
  max_points: 200,
  nitems: 0,
  updateCount: 0,
  brush_size: 10,
  points: [],
};

function setup() {
  my.canv = createCanvas(393, 600);

  my.canv.mouseReleased(canvas_mouseReleased);

  my.min_drag = my.brush_size / 2;

  gallery_signin();

  gallery_onValue();

  strokeWeight(my.brush_size);

  my.clearBtn = createButton('Clear').mousePressed(gallery_clear);
  // my.clearBtn.style('font-size:42px');

  my.trimBtn = createButton('Trim').mousePressed(gallery_trim);
  // my.trimBtn.style('font-size:42px');

  createElement('br');

  ui_update();
}

function draw() {
  window.scrollBy(0, 1);

  background(200);

  for (let index = 1; index < my.points.length; index++) {
    let p1 = my.points[index - 1];
    let p2 = my.points[index];
    if (p1.break || p2.break) continue;
    // line(p1.x + random(-2, 2), p1.y + random(-2, 2), p2.x, p2.y);
    line(p1.x, p1.y, p2.x, p2.y);
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
  add_item({ x, y });
  // required to prevent touch drag moving canvas on mobile
  return false;
}

function add_item(item) {
  my.points.push(item);
  if (my.points.length > my.max_points) {
    my.points.splice(0, 1);
  }
}

function write_points() {
  add_item({ break: 1 });
  gallery_update();
}

function gallery_clear() {
  my.points = [];
  fb_.set(my.galleryRef, {});
}

function gallery_trim() {
  my.points.splice(0, 1);
  gallery_update();
}

function gallery_update() {
  let ucount = 1;
  if (my.rdata && my.rdata.ucount) {
    ucount = my.rdata.ucount + 1;
  }
  fb_.set(my.galleryRef, {
    ucount: ucount,
    now: new Date().toISOString(),
    points: my.points,
  });
}

function canvas_mouseReleased() {
  console.log('canvas_mouseReleased');
  write_points();
}

function gallery_signin() {
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

function gallery_onValue() {
  // Setup listener for changes to firebase db
  my.galleryRef = fb_.ref(fb_.database, my.galleryKey);
  fb_.onValue(my.galleryRef, received_snap);
}

function received_snap(snapshot) {
  // console.log('received_gallery data', data);
  const data = snapshot.val();
  console.log('received_gallery data', data);
  my.rdata = data;
  my.updateCount += 1;
  if (my.rdata && my.rdata.points) {
    my.points = my.rdata.points;
    my.nitems = my.points.length;
  }
  ui_update();
}

function ui_update() {
  ui_span('date', my.version + formatDate());
  ui_span('updateCount', ' updateCount:' + my.updateCount);
  ui_span('nitems', ' nitems:' + my.nitems);
}

function formatDate() {
  return '';
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

// 2023-08-14 jht: Convert to my variable references

// # --
// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0

// https://editor.p5js.org/jht9629-nyu/sketches/fEp51pBhA
// draw-share
