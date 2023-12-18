//
// my dbStoreRootPath: 'm0-@r-@w-',
// dbStoreRootPath/log {
//   DK1Lcj16BFhDPgdvGGkVP9FS3Xy2: {
//     count_i: 1,
//     date_i: 1692655136999,
//     date_s: '2023-08-21T21:58:56.999Z',
//   },
// },
// dbStoreRootPath/pix
//
function dstore_init() {
  let { signInAnonymously, auth } = fb_;
  signInAnonymously(auth)
    .then(() => {
      let uid = auth.currentUser.uid;
      console.log('dstore_init uid=', uid);
      my.uid = uid;
      dstore_active_update();
      dstore_log_onValue();
      dstore_pix_onChild();
    })
    .catch((error) => {
      console.log('dstore_init error', error);
    });
}

function dstore_log_onValue() {
  // Setup listener for changes to firebase db
  let { database, ref, onValue } = fb_.fbase;
  let path = `${my.dbStoreRootPath}/log`;
  let aref = ref(database, path);
  onValue(aref, function (snap) {
    let key = snap.key;
    let data = snap.val();
    console.log('dstore_log_onValue key=' + key, 'data=', data);
    data = data || {};

    my.store_log = data;
    // {
    //   "i3iHgmvAVgWNz2ib1HUOFCOCKrt2": {
    //       "count_i": 3357,
    //       "date_i": 1702832662136,
    //       "date_s": "2023-12-17T17:04:22.136Z",
    //       "name_s": "pjht2"
    //   },
    // ...
    // }
    let index = 0;
    for (let prop in my.store_log) {
      let ent = my.store_log[prop];
      ent.index = index;
      index++;
    }
    my.nlog = index;

    ui_update();
  });
}

function dstore_active_update() {
  let { database, ref, update, increment } = fb_.fbase;
  let path = `${my.dbStoreRootPath}/log/${my.uid}`;
  console.log('dstore_active_update path=', path);
  let aref = ref(database, path);
  let now = new Date();
  const updates = {};
  updates[`date_s`] = now.toISOString();
  updates['date_i'] = now.getTime();
  updates['count_i'] = increment(1);
  updates['name_s'] = my.publishName || null;
  // updates['host_s'] = my.subscribeName || null;
  update(aref, updates);
}

function dstore_pix_onChild() {
  let { database, ref, onChildAdded, onChildChanged, onChildRemoved } = fb_.fbase;
  // from "firebase/database";
  let path = `${my.dbStoreRootPath}/pix`;
  // console.log('dstore_pix_onChild path', path);

  let aref = ref(database, path);

  onChildAdded(aref, (data) => {
    let key = data.key;
    let val = data.val();
    console.log('dstore_pix_onChild Added key=', key, 'val=', val);
    // console.log('dstore_pix_onChild Added typeof val=', typeof val);
    receivedKey(key, val);
    // Array of
    // { "row": [ { "c": [ 75, 74, 79, 255 ], }, ... ]
    // } ...
  });

  onChildChanged(aref, (data) => {
    let key = data.key;
    let val = data.val();
    console.log('dstore_pix_onChild Changed key=', key, 'val=', val);
    // console.log('dstore_pix_onChild Changed typeof val=', typeof val);
    receivedKey(key, val);
  });

  onChildRemoved(aref, (data) => {
    let key = data.key;
    let val = data.val();
    console.log('dstore_pix_onChild Removed key=', key, 'val=', val);
    // console.log('dstore_pix_onChild Removed typeof val=', typeof val);
  });

  function receivedKey(key, val) {
    my.pub_uid = key;
    my.receivedPixs = val;
    // For debugging
    window.gVal = val;
    // onChildChanged DK1Lcj16BFhDPgdvGGkVP9FS3Xy2
    // {
    //   "row": [
    //       { "c": [ 135, 132, 133, 255 ],
    //       },

    if (my.pub_uid) {
      let ent = my.store_log[my.pub_uid];
      if (ent) {
        my.pub_index = ent.index;
      }
    }
  }
}

function dstore_pix_update(irow, row) {
  let { database, ref, update } = fb_.fbase;
  if (!my.uid) {
    console.log('dstore_pix_update no uid', my.uid);
    return;
  }
  let path = `${my.dbStoreRootPath}/pix/${my.uid}/${irow}`;
  let aref = ref(database, path);
  const updates = {};
  updates['i'] = irow;
  updates['row'] = row;
  update(aref, updates);

  dstore_active_update();
}

function dstore_removeAll() {
  let { database, ref, set } = fb_.fbase;
  let path = `${my.dbStoreRootPath}/pix`;
  let aref = ref(database, path);
  set(aref, {})
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
