function dstore_init() {
  my.updateCount = 0;
  dstore_signin();
}

function dstore_signin() {
  fb_
    .signInAnonymously(fb_.auth)
    .then(() => {
      let uid = fb_.auth.currentUser.uid;
      console.log('dstore_signin uid=', uid);
      my.uid = uid;
      dstore_signin_update();
      dstore_log_onValue();
      dstore_pix_onChild();
    })
    .catch((error) => {
      console.log('dstore_signin error', error);
    });
}

function dstore_log_onValue() {
  // Setup listener for changes to firebase db
  let path = `${my.storeRootKey}/log`;
  let ref = fb_.ref(fb_.database, path);
  fb_.onValue(ref, function (snap) {
    let key = snap.key;
    let data = snap.val();
    console.log('dstore_log_onValue key data=', key, data);
    data = data || {};
    my.storeLogData = data;
    my.nitems = Object.keys(data).length;
    my.updateCount += 1;
    ui_update();
  });
}

function dstore_signin_update() {
  let path = `${my.storeRootKey}/log/${my.uid}`;
  console.log('dstore_signin_update path=', path);
  let ref = fb_.ref(fb_.database, path);
  let now = new Date();
  const updates = {};
  updates[`date_s`] = now.toISOString();
  updates[`date_i`] = now.getTime();
  updates[`count_i`] = fb_.increment(1);
  updates['name_s'] = my.guestName || null;
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
    console.log('dstore_pix_onChild Added key val=', key, val);
  });

  fb_.onChildChanged(ref, (data) => {
    let key = data.key;
    let val = data.val();
    console.log('dstore_pix_onChild Changed key val=', key, val);
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
    console.log('dstore_pix_onChild Removed key val=', key, val);
  });
}

function dstore_pix_update(seq, ops) {
  if (!my.uid) {
    console.log('dstore_pix_update no uid', my.uid);
    return;
  }
  let path = `${my.storeRootKey}/pix/${my.uid}/${seq}`;
  let ref = fb_.ref(fb_.database, path);
  const updates = {};
  updates[`date_i`] = Date.now();
  updates[`ops`] = ops;
  updates[`count_i`] = fb_.increment(1);
  fb_.update(ref, updates);
}

// function dstore_empty() {
//   my.points = [];
//   fb_.set(my.storeRootRef, {});
// }

// https://console.firebase.google.com/u/0/project/molab-485f5/database/molab-485f5-default-rtdb/data/~2Fm0-update-web
