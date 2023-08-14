// https://editor.p5js.org/jht9629-nyu/sketches/fEp51pBhA
// draw-share

let a_version = 'v1 ';
let galleryKey = 'mo-draw-web-shared';

let max_points = 100;
let nitems = 0;
let updateCount = 0;
let debug = 0;

let points = [];
let cnv;
let galleryRef;
let rdata;

function setup() {
  cnv = createCanvas(400, 400);
  cnv.mousePressed(canvas_mousePressed);
  cnv.mouseReleased(canvas_mouseReleased);

  // console.log('app', fb_.app);
  check_url_param();

  // Setup listener for changes to firebase db
  galleryRef = fb_.ref(fb_.database, galleryKey);
  fb_.onValue(galleryRef, (snapshot) => {
    const data = snapshot.val();
    console.log('galleryRef data', data);
    received_gallery(data);
  });

  ui_update();

  strokeWeight(10);

  signin();
}

function draw() {
  background(200);

  if (mouseIsPressed) {
    let x = mouseX;
    let y = mouseY;
    points.push({ x, y });
    if (points.length > max_points) {
      points.splice(0, 1);
    }
  }

  for (let index = 1; index < points.length; index++) {
    let p1 = points[index - 1];
    let p2 = points[index];
    line(p1.x, p1.y, p2.x, p2.y);
  }
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

// Not used
function read_points() {
  console.log('read_points');
  fb_
    .get(galleryRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        rdata = snapshot.val();
        console.log('read_points', rdata);
      } else {
        console.log('read_points No data available');
      }
    })
    .catch((error) => {
      console.log('read_points', error);
    });
}

function write_points() {
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

function received_gallery(data) {
  // console.log('received_gallery data', data);
  rdata = data;
  updateCount += 1;

  points = rdata.points;
  nitems = points.length;

  ui_update();
}

function ui_update() {
  ui_span('date', a_version + formatDate());
  ui_span('updateCount', ' updateCount:' + updateCount);
  ui_span('nitems', ' nitems:' + nitems);
}

function formatDate() {
  // return '';
  return new Date().toISOString();
}

function ui_div_empty(id) {
  let div = select('#' + id);
  // console.log('ui_device_selection div', div);
  if (!div) {
    div = createDiv().id(id);
  } else {
    let children = div.child();
    for (let index = children.length - 1; index >= 0; index--) {
      let elm = children[index];
      elm.remove();
    }
  }
  return div;
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

function ui_toggleFullScreen() {
  if (!document.documentElement.requestFullscreen) {
    console.log('NO document.documentElement.requestFullscreen');
    return;
  }
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// let galleryKey = 'mo-gallery-web';
// let galleryKey = 'mo-gallery-ims-web';

function check_url_param() {
  let query = window.location.search;
  console.log('query', query);
  if (query.length < 1) return;
  let params = params_query(query);
  let ngallery = params['gallery'];
  if (ngallery) {
    // mo-gallery-web
    // rasberry pie does not like back quote
    // galleryKey = `mo-gallery-${ngallery}-web`;
    // galleryKey = ngallery;
    galleryKey = 'mo-gallery-' + ngallery;
  }
  console.log('galleryKey', galleryKey);
}

// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
function params_query(query) {
  // eg. query='abc=foo&def=%5Basf%5D&xyz=5'
  // params={abc: "foo", def: "[asf]", xyz: "5"}
  const urlParams = new URLSearchParams(query);
  const params = Object.fromEntries(urlParams);
  return params;
}

// https://editor.p5js.org/jht1493/sketches/5LgILr8RF
// Firebase-createImg-board
// Display images from Firebase storage as a bill board

// https://mobilelabclass-itp.github.io/98-MoGallery-p5js/p5js_demos/createImg-board/
// https://mobilelabclass-itp.github.io/98-MoGallery-p5js/p5js_demos/createImg-board/?gallery=ims-web
// https://mobilelabclass-itp.github.io/98-MoGallery-p5js/p5js_demos/createImg-board/?gallery=web

// # --
// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0

// import { getDatabase, ref, set } from "firebase/database";

// function writeUserData(userId, name, email, imageUrl) {
//   const db = getDatabase();
//   set(ref(db, 'users/' + userId), {
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }

// # --
// import { getDatabase, ref, child, get } from "firebase/database";

// const dbRef = ref(getDatabase());
// get(child(dbRef, `users/${userId}`)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });
