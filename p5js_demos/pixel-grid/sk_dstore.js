function dstore_init() {
  my.updateCount = 0;
  dstore_signin();
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
      dstore_log_onValue();
      dstore_pix_onChild();
    })
    .catch((error) => {
      console.log('signin error', error);
    });
}

function dstore_log_onValue() {
  // Setup listener for changes to firebase db
  let path = `${my.storeRootKey}/log`;
  let ref = fb_.ref(fb_.database, path);
  fb_.onValue(ref, function (snap) {
    let key = snap.key;
    let data = snap.val();
    console.log('dstore_onValue key', key);
    console.log('dstore_onValue data', data);
    data = data || {};
    my.storeData = data;
    my.nitems = Object.keys(data).length;
    my.updateCount += 1;
    ui_update();
  });
}

function dstore_signin_update() {
  let path = `${my.storeRootKey}/log/${my.uid}`;
  console.log('dstore_signin_update path', path);
  let ref = fb_.ref(fb_.database, path);
  let now = new Date();
  const updates = {};
  updates[`date_s`] = now.toISOString();
  updates[`date_i`] = now.getTime();
  updates[`count_i`] = fb_.increment(1);
  updates['name_s'] = my.userName || null;
  updates['host_s'] = my.hostName || null;
  fb_.update(ref, updates);
}

function dstore_pix_onChild() {
  // import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved }
  // from "firebase/database";
  let path = `${my.storeRootKey}/pix`;
  console.log('dstore_pix_onChild path', path);
  let ref = fb_.ref(fb_.database, path);

  fb_.onChildAdded(ref, (data) => {
    let key = data.key;
    let val = data.val();
    console.log('onChildAdded', key, val);
  });

  fb_.onChildChanged(ref, (data) => {
    let key = data.key;
    let val = data.val();
    // console.log('onChildChanged', key, val);
    // onChildChanged DK1Lcj16BFhDPgdvGGkVP9FS3Xy2
    // {
    //   "date_i": 1692677048708,
    //   "ops": [
    //       { "c": [ 135, 132, 133, 255 ],
    //          "h": 27, "r": 1, "w": 27, "x": 0, "y": 0
    //       },
  });

  fb_.onChildRemoved(ref, (data) => {
    let key = data.key;
    let val = data.val();
    console.log('onChildRemoved', key, val);
  });
}

function dstore_pix_update(ops) {
  let path = `${my.storeRootKey}/pix/${my.uid}`;
  let ref = fb_.ref(fb_.database, path);
  const updates = {};
  updates[`date_i`] = Date.now();
  updates[`ops`] = ops;
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
