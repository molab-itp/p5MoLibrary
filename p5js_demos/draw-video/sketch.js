// https://editor.p5js.org/jht9629-nyu/sketches/L5Vr53NQl
// draw-video

let my = {
  version: 12,
  galleryKey: 'mo-draw-web-shared',
  maxPoints: 200,
  vwidth: 480, // Aspect ratio of video capture
  vheight: 640,
  face: true, // camera face front or back
  brushSize: 10,
  // drawBackground: 0,
  drawVideo: 1,
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

  create_myVideo();
}

function draw() {
  if (!video_ready()) return;
  // window.scrollBy(0, 1);

  // if (my.drawBackground) {
  //   my.layer.background(200);
  // }

  if (my.drawVideo) {
    let img = my.video.get();
    img.filter(GRAY);
    image(img, 0, 0);
  }

  draw_points();

  image(my.layer, 0, 0);
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
  my.px = my.x;
  my.py = my.y;

  my.min_drag = my.brushSize / 2;

  my.layer = createGraphics(my.width, my.height);
  my.layer.strokeWeight(my.brushSize);
  my.layer.clear();
}

function draw_points() {
  for (let index = 1; index < my.points.length; index++) {
    let p1 = my.points[index - 1];
    let p2 = my.points[index];
    if (p1.break || p2.break) continue;
    // line(p1.x + random(-2, 2), p1.y + random(-2, 2), p2.x, p2.y);
    if (p1.c != undefined) {
      my.layer.stroke(p1.c);
    }
    my.layer.line(p1.x, p1.y, p2.x, p2.y);
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

function add_item(item) {
  my.points.push(item);
  if (my.points.length > my.maxPoints) {
    my.points.splice(0, 1);
  }
}

function write_points() {
  add_item({ break: 1 });
  gallery_update();
}

function gallery_empty() {
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
  fb_.onValue(my.galleryRef, function (snapshot) {
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
  });
}

function ui_init() {
  createButton('Empty').mousePressed(gallery_empty);

  createButton('Trim').mousePressed(gallery_trim);

  my.faceChk = createCheckbox('Face', my.face);
  my.faceChk.style('display:inline');
  my.faceChk.changed(faceChk_action);

  createButton('Clear').mousePressed(function () {
    my.layer.clear();
  });

  createElement('br');

  ui_update();
}

// check box action for front facing or back facing camera selection
function faceChk_action() {
  my.face = this.checked();
  my.facingMode = my.face ? 'user' : 'environment';
  console.log('my.facingMode', my.facingMode);
  my.video.remove();
  create_myVideo();
}

function ui_update() {
  ui_span('ver', '(' + my.version + ')');
  ui_span('updateCount', ' u:' + my.updateCount);
  ui_span('nitems', ' n:' + my.nitems);
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

// create the vidoe capture element based on my.facingMode
function create_myVideo() {
  let options = { video: { facingMode: my.facingMode } };
  my.video = createCapture(options);
  my.video.size(my.vwidth, my.vheight);
  my.video.hide();
}

// is the video ready to be displayed
function video_ready() {
  return my.video.loadedmetadata && my.video.width > 0 && my.video.height > 0;
}

// 2023-08-14 jht: Convert to my variable references

// https://editor.p5js.org/jht9629-nyu/sketches/uKHKJ1yqX
// show-video-jitter

// # --
// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0

// https://editor.p5js.org/jht9629-nyu/sketches/fEp51pBhA
// draw-share
