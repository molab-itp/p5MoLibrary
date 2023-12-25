//
// my dbStoreRootPath: 'm0-@r-@w-',
// dbStoreRootPath/device {
//   DK1Lcj16BFhDPgdvGGkVP9FS3Xy2: {
//     count_i: 1,
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
      dstore_device_update();
      dstore_device_onValue();
      dstore_pix_onChild();
    })
    .catch((error) => {
      ui_log(my, 'dstore_init error', error);
    });
}

function dstore_device_onValue() {
  // Setup listener for changes to firebase db
  // let { database, ref, onValue } = fb_.fbase;
  let { database, ref, onChildAdded, onChildChanged, onChildRemoved } = fb_.fbase;
  let path = `${my.dbStoreRootPath}/${my.room_name}/device`;
  let aref = ref(database, path);

  // {
  //   "count_i": 259,
  //   "date_s": "2023-12-22T03:51:03.651Z",
  //   "chip": {
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
    receivedDeviceKey('dstore_device_onChild Added', data);
  });

  onChildChanged(aref, (data) => {
    // console.log('dstore_device_onChild Changed', data);
    receivedDeviceKey('dstore_device_onChild Changed', data);
  });

  onChildRemoved(aref, (data) => {
    let key = data.key;
    let val = data.val();
    // ui_log(my, 'dstore_pix_onChild Removed', key, 'val=', val);
    ui_log(my, 'dstore_device_onChild Removed', key, 'n=', Object.keys(val).length);
    if (my.stored_device) {
      delete my.stored_device[key];
      my.ndevice = Object.keys(my.stored_device).length;
    }
    if (my.stored_pixs) {
      delete my.stored_pixs[key];
    }
  });

  function receivedDeviceKey(msg, data) {
    if (!my.stored_device) {
      my.stored_device = {};
    }
    let key = data.key;
    let val = data.val();
    ui_log(my, msg, key, 'n=', Object.keys(val).length);
    let ent = my.stored_device[key];
    if (!ent) {
      // First use of device, add to stored_device
      let index = Object.keys(my.stored_device).length;
      let layer = createGraphics(my.vwidth, my.vheight);
      let crossLayer = createGraphics(my.vwidth, my.vheight);
      ent = { index, layer, crossLayer };
      my.stored_device[key] = ent;
      my.ndevice = index + 1;
    }
    ent.serverValues = val;
    // let chip = val.chip;
    // if (!chip) {
    //   return;
    // }
    // let x = chip.x * chip.s;
    // let y = chip.y * chip.s;
    // let c = chip.c;
    // let innerPx = floor(chip.s * (1 - my.margin));
    // draw_received_shape(ent.layer, x, y, c, innerPx);
  }
}

// inputs
// my.name
// for chip
// let x = my.track_xi;
// let y = my.track_yi;
// let s = my.stepPx;
// let c = my.videoColor;

function dstore_device_update() {
  // console.log('dstore_device_update my.uid', my.uid);
  ui_log(my, 'dstore_device_update my.uid', my.uid);
  if (!my.uid) return;

  // if (!my.stored_device) {
  //   console.log('dstore_device_update NO my.stored_device', my.stored_device);
  //   // Wait until we receive device into to track activity
  //   return;
  // }

  let { database, ref, update, increment } = fb_.fbase;
  let path = `${my.dbStoreRootPath}/${my.room_name}/device/${my.uid}`;
  // ui_log(my, 'dstore_device_update', path);
  let aref = ref(database, path);

  let date_s = new Date().toISOString();
  let count_i = increment(1);
  let name_s = my.name || null;
  let x = my.track_xi;
  let y = my.track_yi;
  let s = my.stepPx;
  let c = my.videoColor;
  if (!c) c = [0, 0, 0];
  let chip = { x, y, s, c };

  let updates = { date_s, count_i, name_s, chip };

  // Acivity is only updated if present in recently received server info
  let activity = dstore_device_activity(my.uid, date_s);
  if (activity) {
    updates.activity = activity;
  }
  update(aref, updates);
}

function dstore_device_activity(key, date_s) {
  // ui_log(my, 'dstore_device_activity key', key, date_s);
  let activity = dstore_initActivity(key, date_s);
  if (!activity) return null;

  let ent = activity[0];
  if (!my.activityLogTimeWindow) {
    my.activityLogTimeWindow = 1000;
    my.activityLogMax = 3;
  }
  let nowTime = new Date(date_s).getTime();
  let pastTime = new Date(ent.date_s).getTime();
  let ndiff = nowTime - pastTime;
  if (ndiff > my.activityLogTimeWindow) {
    // Create a new entry at head of the activity log
    let duration = 0;
    ent = { date_s, duration };
    activity.unshift(ent);
  } else {
    // Update the first entry with new duration and date
    ent.date_s = date_s;
    ent.duration += ndiff;
  }
  if (activity.length > my.activityLogMax) {
    // Delete the last entry to keep to max number permitted
    activity.splice(-1, 1);
  }
  return activity;
}

function dstore_initActivity(key, date_s) {
  let duration = 0;
  let initAcivity = [{ date_s, duration }];
  // return null
  // if no server info received yet or no entry for this device
  if (!my.stored_device) return null;

  let ent = my.stored_device[key];
  if (!ent) return null;

  let activity = ent.serverValues.activity;
  if (!activity) return initAcivity;
  if (activity.length == 0) return initAcivity;

  return activity;
}

// ent from stored_device
function dstore_device_isActive(deviceEnt) {
  let activity = deviceEnt.serverValues.activity;
  if (!activity) return 0;
  if (activity.length <= 0) return 0;
  let ent = activity[0];
  let lapse = Date.now() - new Date(ent.date_s);
  // console.log('dstore_device_isActive deviceEnt.index', deviceEnt.index, 'lapse', lapse, my.activityLogTimeWindow);
  return lapse < my.activityLogTimeWindow;
}

function dstore_device_remove() {
  let { database, ref, set } = fb_.fbase;
  let path = `${my.dbStoreRootPath}/${my.room_name}/device/${my.uid}`;
  let aref = ref(database, path);
  set(aref, {})
    .then(() => {
      // Data saved successfully!
      ui_log(my, 'dstore_device_remove OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log(my, 'dstore_device_remove error', error);
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
    }
  });

  function receivedPixKey(msg, data) {
    let key = data.key;
    let val = data.val();
    ui_log(my, msg, key, 'n=', val.length);
    if (!my.stored_pixs) {
      my.stored_pixs = {};
    }
    my.stored_pixs[key] = val;
  }
}

function dstore_pix_update(irow, stepPx, row) {
  let { database, ref, update } = fb_.fbase;
  if (!my.uid) {
    ui_log(my, 'dstore_pix_update no uid', my.uid);
    return;
  }
  let path = `${my.dbStoreRootPath}/${my.room_name}/pix/${my.uid}/${irow}`;
  let aref = ref(database, path);
  let i = irow;
  let s = stepPx;
  update(aref, { i, s, row });

  dstore_device_update();
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

function dstore_clear() {
  dstore_device_remove();
  dstore_pix_remove();
  delete my.stored_device;
  delete my.stored_pixs;
}

// https://console.firebase.google.com/u/0/project/molab-485f5/database/molab-485f5-default-rtdb/data

// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0

// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0#read_data_once_with_an_observer

// https://firebase.google.com/docs/reference/js/database.datasnapshot?authuser=0

// https://firebase.google.com/docs/reference/js/database?authuser=0

// https://firebase.google.com/docs/reference/js/database.md?authuser=0#onchildadded
