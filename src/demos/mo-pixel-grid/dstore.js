//
// my dbStoreRootPath: 'm0-@r-@w-',
// dbStoreRootPath/agent {
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
      ui_log(my, 'dstore_init', uid);
      my.uid = uid;
      dstore_agent_update();
      dstore_agent_onValue();
      dstore_pix_onChild();
    })
    .catch((error) => {
      ui_log(my, 'dstore_init error', error);
    });
}

function dstore_agent_onValue() {
  // Setup listener for changes to firebase db
  // let { database, ref, onValue } = fb_.fbase;
  let { database, ref, onChildAdded, onChildChanged, onChildRemoved } = fb_.fbase;
  let path = `${my.dbStoreRootPath}/${my.room_name}/agent`;
  let aref = ref(database, path);
  // onValue(aref, function (snap) {
  //   let key = snap.key;
  //   let data = snap.val();
  //   // ui_log(my, 'dstore_agent_onValue', key, 'data=', data);
  //   data = data || {};
  //   // ui_log(my, 'dstore_agent_onValue', key, 'n=', Object.keys(data).length);
  //   console.log('dstore_agent_onValue|', key, '|n=', Object.keys(data).length);

  if (!my.stored_agent) {
    my.stored_agent = {};
  }

  // {
  //   "count_i": 259,
  //   "date_i": 1703217063651,
  //   "date_s": "2023-12-22T03:51:03.651Z",
  //   "pt": {
  //       "c": [
  //           0,
  //           0,
  //           0
  //       ],
  //       "s": 80,
  //       "x": 0,
  //       "y": 0
  //   }
  // }

  onChildAdded(aref, (data) => {
    receivedAgentKey('dstore_agent_onChild Added', data);
  });

  onChildChanged(aref, (data) => {
    receivedAgentKey('dstore_agent_onChild Changed', data);
  });

  onChildRemoved(aref, (data) => {
    let key = data.key;
    let val = data.val();
    // ui_log(my, 'dstore_pix_onChild Removed', key, 'val=', val);
    ui_log(my, 'dstore_agent_onChild Removed', key, 'n=', Object.keys(val).length);
    if (my.stored_agent) {
      delete my.stored_agent[key];
    }
  });

  function receivedAgentKey(msg, data) {
    let key = data.key;
    let val = data.val();
    ui_log(my, msg, key, 'n=', Object.keys(val).length);
    let ent = my.stored_agent[key];
    if (!ent) {
      let index = Object.keys(my.stored_agent).length;
      let layer = createGraphics(my.vwidth, my.vheight);
      ent = { index, layer };
      my.stored_agent[key] = ent;
      my.nagent = index + 1;
    }
    ent.serverValues = val;
    let chip = val.chip;
    if (!chip) {
      return;
    }
    let x = chip.x * chip.s;
    let y = chip.y * chip.s;
    let innerPx = floor(chip.s * (1 - my.margin));
    let layer = ent.layer;
    layer.fill(chip.c);
    layer.noStroke();
    draw_sub_shape(layer, x, y, innerPx);
  }
}

function dstore_agent_update() {
  // ui_log(my, 'dstore_agent_update my.uid', my.uid);
  if (!my.uid) return;
  let { database, ref, update, increment } = fb_.fbase;
  let path = `${my.dbStoreRootPath}/${my.room_name}/agent/${my.uid}`;
  // ui_log(my, 'dstore_agent_update', path);
  let aref = ref(database, path);
  let now = new Date();
  const updates = {};
  updates[`date_s`] = now.toISOString();
  updates['date_i'] = now.getTime();
  updates['count_i'] = increment(1);
  updates['name_s'] = my.name || null;
  let c = my.videoColor;
  if (!c) c = [0, 0, 0];
  updates['chip'] = { x: my.track_xi, y: my.track_yi, s: my.stepPx, c: c };
  update(aref, updates);
}

function dstore_agent_remove() {
  let { database, ref, set } = fb_.fbase;
  let path = `${my.dbStoreRootPath}/${my.room_name}/agent/${my.uid}`;
  let aref = ref(database, path);
  set(aref, {})
    .then(() => {
      // Data saved successfully!
      ui_log(my, 'dstore_agent_remove OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log(my, 'dstore_agent_remove error', error);
    });
}

function dstore_pix_onChild() {
  //
  let { database, ref, onChildAdded, onChildChanged, onChildRemoved } = fb_.fbase;
  // from "firebase/database";
  let path = `${my.dbStoreRootPath}/${my.room_name}/pix`;
  ui_log(my, 'dstore_pix_onChild path=', path);
  let aref = ref(database, path);

  onChildAdded(aref, (data) => {
    receivedPixKey('dstore_pix_onChild Added', data);
  });

  onChildChanged(aref, (data) => {
    receivedPixKey('dstore_pix_onChild Changed', data);
  });

  onChildRemoved(aref, (data) => {
    let key = data.key;
    let val = data.val();
    // ui_log(my, 'dstore_pix_onChild Removed', key, 'val=', val);
    ui_log(my, 'dstore_pix_onChild Removed', key, 'n=', val.length);
    if (my.stored_pixs) {
      delete my.stored_pixs[key];
      if (key == my.agent_uid) {
        my.agent_uid = null;
      }
    }
  });

  function receivedPixKey(msg, data) {
    let key = data.key;
    let val = data.val();
    ui_log(my, msg, key, 'n=', val.length);
    if (!my.agent_uid) {
      my.agent_uid = key;
      console.log('receivedPixKey my.agent_uid', my.agent_uid);
    }
    if (!my.stored_pixs) {
      my.stored_pixs = {};
    }
    my.stored_pixs[key] = val;
  }
}

// function dstore_receivedPixs() {
//   if (!my.stored_pixs) {
//     return null;
//   }
//   return my.stored_pixs[my.agent_uid];
// }

// function dstore_nextPixs() {
//   console.log('dstore_nextPixs my.agent_uid', my.agent_uid);
//   if (!my.stored_pixs) return;
//   let keys = Object.keys(my.stored_pixs);
//   // console.log('dstore_nextPixs keys', keys);
//   let index = keys.indexOf(my.agent_uid);
//   // console.log('dstore_nextPixs index', index);
//   index = (index + 1) % keys.length;
//   my.agent_uid = keys[index];
//   let pixs = my.stored_pixs[my.agent_uid];
//   // console.log('pixs', pixs.length);
//   if (pixs) {
//     update_nstep(pixs.length);
//   }
// }

function dstore_pix_update(irow, row) {
  let { database, ref, update } = fb_.fbase;
  if (!my.uid) {
    ui_log(my, 'dstore_pix_update no uid', my.uid);
    return;
  }
  let path = `${my.dbStoreRootPath}/${my.room_name}/pix/${my.uid}/${irow}`;
  let aref = ref(database, path);
  const updates = {};
  updates['i'] = irow;
  updates['row'] = row;
  update(aref, updates);

  dstore_agent_update();
}

// db goes to read-only mode when nstep=128
function dstore_pix_removeAll() {
  let { database, ref, set } = fb_.fbase;
  let path = `${my.dbStoreRootPath}/${my.room_name}/pix`;
  let aref = ref(database, path);
  set(aref, {})
    .then(() => {
      // Data saved successfully!
      ui_log(my, 'dstore_removeAll OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log(my, 'dstore_removeAll error', error);
    });
}

function dstore_pix_remove() {
  let { database, ref, set } = fb_.fbase;
  let path = `${my.dbStoreRootPath}/${my.room_name}/pix/${my.uid}`;
  let aref = ref(database, path);
  set(aref, {})
    .then(() => {
      // Data saved successfully!
      ui_log(my, 'dstore_pix_remove OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log(my, 'dstore_pix_remove error', error);
    });
}

// https://console.firebase.google.com/u/0/project/molab-485f5/database/molab-485f5-default-rtdb/data

// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0

// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0#read_data_once_with_an_observer

// https://firebase.google.com/docs/reference/js/database.datasnapshot?authuser=0

// https://firebase.google.com/docs/reference/js/database?authuser=0

// https://firebase.google.com/docs/reference/js/database.md?authuser=0#onchildadded
