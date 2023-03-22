// https://editor.p5js.org/jht1493/sketches/5LgILr8RF
// Firebase-createImg-board
// Display images from Firebase storage as a bill board

let storeKey = 'mo-gallery-web';
let nitems = 0;
let updateCount = 0;
let doScroll = false;
let shuffleBtn;
let fullScreenBtn;
let toggleScrollButn;
let rdata; // Firebase object results from server. key is id
let rarr; // Array of items from server
let rwidth = 1920; // dimensions for image element
let rheight = 1080;
let scrollLimit = 0;
let debug = 0;

function setup() {
  noCanvas();
  // console.log('app', fb_.app);
  if (debug) {
    rwidth = rwidth / 4;
    rheight = rheight / 4;
    scrollLimit = 2;
    doScroll = 1;
  }
  // Setup listner for changes to firebase db
  let galleryRef = fb_.ref(fb_.database, storeKey);
  fb_.onValue(galleryRef, (snapshot) => {
    const data = snapshot.val();
    console.log('galleryRef data', data);
    received_gallery(data);
  });

  shuffleBtn = createButton('Shuffle').mousePressed(() => {
    //console.log('Shuffle');
    received_gallery(rdata, { doShuffle: 1 });
  });
  shuffleBtn.style('font-size:42px');

  fullScreenBtn = createButton('Full Screen').mousePressed(() => {
    ui_toggleFullScreen();
    ui_remove_all();
  });
  fullScreenBtn.style('font-size:42px');

  toggleScrollButn = createButton('Scroll').mousePressed(() => {
    doScroll = !doScroll;
    console.log('doScroll', doScroll);
    if (doScroll) {
      ui_toggleFullScreen();
      ui_remove_all();
    }
    // window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  });
  toggleScrollButn.style('font-size:42px');

  ui_update();
}

function draw() {
  // console.log('draw');
  if (doScroll) {
    // window.scrollBy({ top: window.scrollY + 1, behavior: 'smooth' });
    window.scrollBy(0, 1);
    let nlimit = scrollLimit || rarr.length;
    if (window.scrollY > (nlimit + 1) * rheight) {
      window.scrollTo(0, 0);
    }
  }
}

function ui_remove_all() {
  shuffleBtn.remove();
  fullScreenBtn.remove();
  toggleScrollButn.remove();
}

function ui_update() {
  ui_span('date', ' ' + formatDate());
  ui_span('updateCount', ' updateCount:' + updateCount);
  ui_span('nitems', ' nitems:' + nitems);
}

function formatDate() {
  // return '';
  return new Date().toISOString();
}
function received_gallery(data, opts) {
  let div = ui_div_empty('igallery');
  if (!data) {
    return;
  }
  rdata = data;
  updateCount += 1;

  // for (key in data) {
  //   console.log('key', key);
  //   let val = data[key];

  // Display in reverse order to see new additions first
  rarr = Object.values(data).reverse();
  if (opts && opts.doShuffle) {
    rarr = shuffle(arr);
  }
  nitems = rarr.length;

  for (val of rarr) {
    // console.log('received_gallery val', val);
    // let img = createImg( 'https://p5js.org/assets/img/asterisk-01.png', 'the p5 magenta asterisk' );
    // select full resolution media if available
    //
    let path = val.mediaPathFullRez ?? val.mediaPath;
    let img = createImg(path, val.authorEmail);
    div.child(img);

    img.style(`width: ${rwidth}px;`);

    ui_update();
  }
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
