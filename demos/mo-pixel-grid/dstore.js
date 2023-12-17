// my dbStoreRootPath: 'm0-@r-@w-',
// storeLogData/log {
//   DK1Lcj16BFhDPgdvGGkVP9FS3Xy2: {
//     count_i: 1,
//     date_i: 1692655136999,
//     date_s: '2023-08-21T21:58:56.999Z',
//   },
// },
// storeLogData/pix
//
// query:
//  g -> guestName
//  h -> hostName

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
  let path = `${my.dbStoreRootPath}/log`;
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
  let path = `${my.dbStoreRootPath}/log/${my.uid}`;
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
  let path = `${my.dbStoreRootPath}/pix`;
  console.log('dstore_pix_onChild path', path);
  let ref = fb_.ref(fb_.database, path);

  fb_.onChildAdded(ref, (data) => {
    let key = data.key;
    let val = data.val();
    console.log('dstore_pix_onChild Added key val=', key, val);
    console.log('dstore_pix_onChild Added typeof val=', typeof val);
    my.receivedPixs = val;
    // For debugging
    window.gVal = val;
    // Array.isArray(gVal) --> true
    // Array of
    // {
    //   "count_i": 93,
    //   "date_i": 1702796259458,
    //   "ops": [ {
    //           "c": [ 75, 74, 79, 255 ],
    //           "h": 54,
    //           "r": 1,
    //           "w": 54,
    //           "x": 0,
    //           "y": 0
    //       },
  });

  fb_.onChildChanged(ref, (data) => {
    let key = data.key;
    let val = data.val();
    console.log('dstore_pix_onChild Changed key val=', key, val);
    console.log('dstore_pix_onChild Changed typeof val=', typeof val);
    my.receivedPixs = val;
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
    console.log('dstore_pix_onChild Removed typeof val=', typeof val);
  });
}

function dstore_pix_update(seq, ops) {
  if (!my.uid) {
    console.log('dstore_pix_update no uid', my.uid);
    return;
  }
  let path = `${my.dbStoreRootPath}/pix/${my.uid}/${seq}`;
  let ref = fb_.ref(fb_.database, path);
  const updates = {};
  updates[`date_i`] = Date.now();
  updates[`ops`] = ops;
  updates[`count_i`] = fb_.increment(1);
  fb_.update(ref, updates);
}

function dstore_removeAll() {
  let path = `${my.dbStoreRootPath}/pix`;
  let ref = fb_.ref(fb_.database, path);
  fb_
    .set(ref, {})
    .then(() => {
      // Data saved successfully!
      console.log('dstore_removeAll OK');
    })
    .catch((error) => {
      // The write failed...
      console.log('dstore_removeAll error', error);
    });
}

// https://console.firebase.google.com/u/0/project/molab-485f5/database/molab-485f5-default-rtdb/data

// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0

// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0#read_data_once_with_an_observer

// https://firebase.google.com/docs/reference/js/database.datasnapshot?authuser=0

// https://firebase.google.com/docs/reference/js/database?authuser=0

// https://firebase.google.com/docs/reference/js/database.md?authuser=0#onchildadded
