// https://editor.p5js.org/jht1493/sketches/5LgILr8RF
// Firebase-createImg-board
// Display images from Firebase storage as a bill board

let storeKey = 'mo-gallery-1';
let xloc;
let yloc;
let nitems;
let updateCount = 0;

function setup() {
  createCanvas(400, 100);

  // console.log('app', fb_.app);

  // Setup listner for changes to firebase db
  let galleryRef = fb_.ref(fb_.database, storeKey);
  fb_.onValue(galleryRef, (snapshot) => {
    const data = snapshot.val();
    console.log('galleryRef data', data);
    received_gallery(data);
  });

  xloc = 10;
  yloc = height / 2;
}

function draw() {
  background(220);
  text(storeKey, xloc, yloc);
  // xloc = (xloc + 1) % width;
  if (nitems) {
    text('nitems=' + nitems, 10, 20);
    text('updateCount=' + updateCount, 10, 35);
  }
}

function received_gallery(data) {
  let div = ui_div_empty('igallery');
  if (!data) {
    return;
  }
  updateCount += 1;

  // for (key in data) {
  //   console.log('key', key);
  //   let val = data[key];

  // Display in reverse order to see new additions first
  let arr = Object.values(data).reverse();
  nitems = arr.length;

  for (val of arr) {
    console.log('val', val);
    // let img = createImg( 'https://p5js.org/assets/img/asterisk-01.png', 'the p5 magenta asterisk' );
    let img = createImg(val.mediaPath, val.authorEmail);
    div.child(img);
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
