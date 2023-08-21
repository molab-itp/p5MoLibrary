function dstore_init() {
  my.updateCount = 0;
  dstore_signin();
  dstore_onValue();
}

function dstore_signin() {
  fb_
    .signInAnonymously(fb_.auth)
    .then(() => {
      console.log('signin OK');
      let uid = fb_.auth.currentUser.uid;
      console.log('uid', uid);
      my.uid = uid;
      dstore_signin_update();
      // read_points();
    })
    .catch((error) => {
      console.log('signin error', error);
    });
}

function dstore_onValue() {
  // Setup listener for changes to firebase db
  my.storeRootRef = fb_.ref(fb_.database, my.storeRootKey);
  fb_.onValue(my.storeRootRef, function (snapshot) {
    const data = snapshot.val();
    console.log('dstore_onValue data', data);
    my.storeData = data;
    my.nitems = Object.keys(data).length;
    my.updateCount += 1;
    ui_update();
  });
}

function dstore_signin_update() {
  let path = `${my.storeRootKey}/${my.uid}`;
  console.log('dstore_signin_update path', path);
  let ref = fb_.ref(fb_.database, path);
  let now = new Date();
  const updates = {};
  updates[`date_s`] = now.toISOString();
  updates[`date_i`] = now.getTime();
  updates[`count_i`] = fb_.increment(1);
  if (my.userName) {
    updates['name_s'] = my.userName;
  }
  fb_.update(ref, updates);
}

// function dstore_empty() {
//   my.points = [];
//   fb_.set(my.storeRootRef, {});
// }

// function dstore_trim() {
//   my.points.splice(0, 1);
//   dstore_update();
// }

// function dstore_update() {
//   let ucount = 1;
//   if (my.storeData && my.storeData.ucount) {
//     ucount = my.storeData.ucount + 1;
//   }
//   fb_.set(my.storeRootRef, {
//     ucount: ucount,
//     now: new Date().toISOString(),
//     points: my.points,
//   });
// }
