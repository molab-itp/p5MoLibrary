//
// my dbStoreRootPath: 'm0-@r-@w-',
// dbStoreRootPath/room0/device {
// dbStoreRootPath/room0/pix
//
function dstore_init() {
  let { signInAnonymously, auth } = fb_;
  signInAnonymously(auth)
    .then(() => {
      my.uid = auth.currentUser.uid;
      ui_log(my, 'dstore_init', my.uid);
      dstore_device_update();
      dstore_device_onChild();
      dstore_pixgrid_onChild();
    })
    .catch((error) => {
      ui_log(my, 'dstore_init error', error);
    });
}

// device {
//   "count": 259,
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
  let path = `${my.dbStoreRootPath}/${my.roomName}/device`;
  let refPath = ref(database, path);

  onChildAdded(refPath, (data) => {
    receivedDeviceKey('dstore_device_onChild Added', data);
  });

  onChildChanged(refPath, (data) => {
    // console.log('dstore_device_onChild Changed', data);
    receivedDeviceKey('dstore_device_onChild Changed', data);
  });

  onChildRemoved(refPath, (data) => {
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
      if (my.stored_pixgrids) {
        delete my.stored_pixgrids[key];
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
  let path = `${my.dbStoreRootPath}/${my.roomName}/device/${my.uid}`;
  // ui_log(my, 'dstore_device_update', path);
  let refPath = ref(database, path);

  let date_s = new Date().toISOString();
  let count = increment(1);
  let name_s = my.name || '';
  let x = my.track_xi;
  let y = my.track_yi;
  let s = my.stepPx;
  let c = my.videoColor || [0, 0, 0];
  let chip = { x, y, s, c };

  let updates = { date_s, count, name_s, chip };

  // Acivity is only updated if present in recently received server info
  let activities = dstore_device_activities(my.uid, date_s);
  if (activities) {
    updates.activity = activities;
    updates.time = activities[0].time;
    updates.time_s = activities[0].time_s;
  }
  update(refPath, updates);
}

function dstore_device_activities(key, date_s) {
  // ui_log(my, 'dstore_device_activities key', key, date_s);
  let activities = dstore_initActivities(key, date_s);
  if (!activities) return null;

  let activity = activities[0];
  if (!my.activityLogTimeMax) {
    my.activityLogTimeMax = 2000;
    my.activityLogMax = 9;
  }
  let nowTime = new Date(date_s).getTime();
  let pastTime = new Date(activity.date_s).getTime();
  let ndiff = nowTime - pastTime;
  if (ndiff > my.activityLogTimeMax) {
    // Create a new entry at head of the activity log
    let time = 0;
    let time_s = '';
    activity = { date_s, time, time_s };
    activities.unshift(activity);
  } else {
    // Update the first entry with new time and date
    activity.date_s = date_s;
    activity.time += ndiff;
    activity.time_s = convertTimeToSeconds(activity.time);
  }
  updateTimeGap(activities);
  if (activities.length > my.activityLogMax) {
    // Delete the last entry to keep to max number permitted
    activities.splice(-1, 1);
  }
  return activities;
}

function dstore_initActivities(key, date_s) {
  let time = 0;
  let initActivities = [{ date_s, time }];
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

function dstore_device_activityGapTime(device) {
  let activities = device.serverValues.activity;
  if (!activities) return 0;
  if (activities.length <= 0) return 0;
  let activity = activities[0];
  let gapTime = Date.now() - new Date(activity.date_s);
  // console.log('dstore_device_activityGapTime device.index', device.index, 'gapTime', gapTime);
  return gapTime;
}

function dstore_device_isActive(device) {
  let gapTime = dstore_device_activityGapTime(device);
  // console.log('dstore_device_isActive device.index', device.index, 'gapTime', lapgapTimese, my.activityLogTimeMax);
  return gapTime < my.activityLogTimeMax;
}

function dstore_device_remove() {
  let { database, ref, set } = fb_.fbase;
  let path = `${my.dbStoreRootPath}/${my.roomName}/device/${my.uid}`;
  let refPath = ref(database, path);
  set(refPath, {})
    .then(() => {
      // Data saved successfully!
      // ui_log(my, 'dstore_device_remove OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log(my, 'dstore_device_remove error', error);
    });
}

function dstore_pixgrid_onChild() {
  //
  let { database, ref, onChildAdded, onChildChanged, onChildRemoved } = fb_.fbase;
  // from "firebase/database";
  let path = `${my.dbStoreRootPath}/${my.roomName}/pixgrid`;
  ui_log(my, 'dstore_pixgrid_onChild path=', path);
  let refPath = ref(database, path);

  onChildAdded(refPath, (data) => {
    receivedPixKey('dstore_pixgrid_onChild Added', data);
  });

  onChildChanged(refPath, (data) => {
    receivedPixKey('dstore_pixgrid_onChild Changed', data);
  });

  onChildRemoved(refPath, (data) => {
    receivedPixKey('dstore_pixgrid_onChild Removed', data, { remove: 1 });
  });

  function receivedPixKey(msg, data, remove) {
    let key = data.key;
    let val = data.val();
    ui_log(my, msg, key, 'n=', val.length);
    if (remove) {
      delete my.stored_pixgrids[key];
      return;
    }
    if (!my.stored_pixgrids) {
      my.stored_pixgrids = {};
    }
    my.stored_pixgrids[key] = val;
  }
}

function dstore_pixgrid_update(irow, stepPx, row) {
  let { database, ref, update } = fb_.fbase;
  if (!my.uid) {
    ui_log(my, 'dstore_pixgrid_update no uid', my.uid);
    return;
  }
  let path = `${my.dbStoreRootPath}/${my.roomName}/pixgrid/${my.uid}/${irow}`;
  let refPath = ref(database, path);
  let i = irow;
  let s = stepPx;
  update(refPath, { i, s, row });

  dstore_device_update();
}

// db goes to read-only mode when nstep=128
function dstore_pixgrid_removeAll() {
  let { database, ref, set } = fb_.fbase;
  let path = `${my.dbStoreRootPath}/${my.roomName}/pixgrid`;
  let refPath = ref(database, path);
  set(refPath, {})
    .then(() => {
      // Data saved successfully!
      // ui_log(my, 'dstore_removeAll OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log(my, 'dstore_removeAll error', error);
    });
}

function dstore_pixgrid_remove() {
  let { database, ref, set } = fb_.fbase;
  let path = `${my.dbStoreRootPath}/${my.roomName}/pixgrid/${my.uid}`;
  let refPath = ref(database, path);
  set(refPath, {})
    .then(() => {
      // Data saved successfully!
      // ui_log(my, 'dstore_pixgrid_remove OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log(my, 'dstore_pixgrid_remove error', error);
    });
}

function dstore_remove() {
  dstore_device_remove();
  dstore_pixgrid_remove();
  delete my.stored_device;
  delete my.stored_pixgrids;
}

// https://console.firebase.google.com/u/0/project/molab-485f5/database/molab-485f5-default-rtdb/data

// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0

// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0#read_data_once_with_an_observer

// https://firebase.google.com/docs/reference/js/database.datasnapshot?authuser=0

// https://firebase.google.com/docs/reference/js/database?authuser=0

// https://firebase.google.com/docs/reference/js/database.md?authuser=0#onchildadded
