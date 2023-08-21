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

function gallery_init() {
  my.updateCount = 0;
  gallery_signin();
  gallery_onValue();
}

function gallery_signin() {
  fb_
    .signInAnonymously(fb_.auth)
    .then(() => {
      console.log('signin OK');
      console.log('uid', fb_.auth.currentUser.uid);
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
    const data = snapshot.val();
    console.log('gallery_onValue data', data);
    my.rdata = data;
    my.updateCount += 1;
    if (my.rdata && my.rdata.points) {
      my.points = my.rdata.points;
      my.nitems = my.points.length;
    }
    ui_update();
  });
}
