//
// my dbStoreRootPath: 'm0-@r-@w-',
// dbStoreRootPath/room0/device {
// dbStoreRootPath/room0/pix
//
function dstore_init() {
  let { signInAnonymously, auth } = fb_;
  signInAnonymously(auth)
    .then(() => {
      let uid = auth.currentUser.uid;
      ui_log(my, 'dstore_init', uid);
      my.uid = uid;
      dstore_device_update();
      dstore_device_onChild();
      dstore_pix_onChild();
    })
    .catch((error) => {
      ui_log(my, 'dstore_init error', error);
    });
}

// device {
//   "count_i": 259,
//   "date_s": "2023-12-22T03:51:03.651Z",
//   activity: [ ... ]
//   "chip": {
//       "c": [
//           0,
//           0,
//           0
//       ],
//       "s": 80,
//       "x": 0,
//       "y": 0
//   } // end chip
// }

function dstore_device_onChild() {
  // Setup listener for changes to firebase db device
  let { database, ref, onChildAdded, onChildChanged, onChildRemoved } = fb_.fbase;
  let path = `${my.dbStoreRootPath}/${my.room_name}/device`;
  let aref = ref(database, path);

  onChildAdded(aref, (data) => {
    receivedDeviceKey('dstore_device_onChild Added', data);
  });

  onChildChanged(aref, (data) => {
    // console.log('dstore_device_onChild Changed', data);
    receivedDeviceKey('dstore_device_onChild Changed', data);
  });

  onChildRemoved(aref, (data) => {
    receivedDeviceKey('dstore_device_onChild Removed', data, { remove: 1 });
  });

  function receivedDeviceKey(msg, data, remove) {
    let key = data.key;
    let val = data.val();
    ui_log(my, msg, key, 'n=', Object.keys(val).length);
    if (remove) {
      if (my.stored_device) {
        delete my.stored_device[key];
        my.ndevice = Object.keys(my.stored_device).length;
      }
      if (my.stored_pixs) {
        delete my.stored_pixs[key];
      }
      return;
    }
    if (!my.stored_device) {
      my.stored_device = {};
    }
    let device = my.stored_device[key];
    if (!device) {
      // First use of device, add to my.stored_device
      let index = Object.keys(my.stored_device).length;
      let layer = createGraphics(my.vwidth, my.vheight);
      let crossLayer = createGraphics(my.vwidth, my.vheight);
      device = { index, layer, crossLayer };
      my.stored_device[key] = device;
      my.ndevice = index + 1;
    }
    device.serverValues = val;
  }
}

// inputs:
// my.uid
// my.name
// for chip
//   let x = my.track_xi;
//   let y = my.track_yi;
//   let s = my.stepPx;
//   let c = my.videoColor;

function dstore_device_update() {
  // console.log('dstore_device_update my.uid', my.uid);
  ui_log(my, 'dstore_device_update my.uid', my.uid);
  if (!my.uid) return;

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
  let activities = dstore_device_activities(my.uid, date_s);
  if (activities) {
    updates.activity = activities;
  }
  update(aref, updates);
}

function dstore_device_activities(key, date_s) {
  // ui_log(my, 'dstore_device_activities key', key, date_s);
  let activities = dstore_initActivities(key, date_s);
  if (!activities) return null;

  let activity = activities[0];
  if (!my.activityLogTimeMax) {
    my.activityLogTimeMax = 1000;
    my.activityLogMax = 3;
  }
  let nowTime = new Date(date_s).getTime();
  let pastTime = new Date(activity.date_s).getTime();
  let ndiff = nowTime - pastTime;
  if (ndiff > my.activityLogTimeMax) {
    // Create a new entry at head of the activity log
    let duration = 0;
    activity = { date_s, duration };
    activities.unshift(activity);
  } else {
    // Update the first entry with new duration and date
    activity.date_s = date_s;
    activity.duration += ndiff;
  }
  if (activities.length > my.activityLogMax) {
    // Delete the last entry to keep to max number permitted
    activities.splice(-1, 1);
  }
  return activities;
}

function dstore_initActivities(key, date_s) {
  let duration = 0;
  let initActivities = [{ date_s, duration }];
  // return null if no server info received yet
  //  or no entry for this device
  if (!my.stored_device) return null;

  let device = my.stored_device[key];
  if (!device) return null;

  let activities = device.serverValues.activity;
  if (!activities) return initActivities;
  if (activities.length == 0) return initActivities;

  return activities;
}

function dstore_device_isActive(device) {
  let activities = device.serverValues.activity;
  if (!activities) return 0;
  if (activities.length <= 0) return 0;
  let activity = activities[0];
  let lapse = Date.now() - new Date(activity.date_s);
  // console.log('dstore_device_isActive device.index', device.index, 'lapse', lapse, my.activityLogTimeMax);
  return lapse < my.activityLogTimeMax;
}

function dstore_device_remove() {
  let { database, ref, set } = fb_.fbase;
  let path = `${my.dbStoreRootPath}/${my.room_name}/device/${my.uid}`;
  let aref = ref(database, path);
  set(aref, {})
    .then(() => {
      // Data saved successfully!
      // ui_log(my, 'dstore_device_remove OK');
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
    receivedPixKey('dstore_pix_onChild Removed', data, { remove: 1 });
  });

  function receivedPixKey(msg, data, remove) {
    let key = data.key;
    let val = data.val();
    ui_log(my, msg, key, 'n=', val.length);
    if (remove) {
      delete my.stored_pixs[key];
      return;
    }
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
      // ui_log(my, 'dstore_removeAll OK');
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
      // ui_log(my, 'dstore_pix_remove OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log(my, 'dstore_pix_remove error', error);
    });
}

function dstore_remove() {
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
