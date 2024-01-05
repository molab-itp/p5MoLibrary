//
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

// inputs:
// my.uid
// my.nameDevice
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
  let path = `${my.dstore_rootPath}/${my.roomName}/device/${my.uid}`;
  // ui_log(my, 'dstore_device_update', path);
  let refPath = ref(database, path);

  let date_s = new Date().toISOString();
  let count = increment(1);
  let name_s = my.nameDevice || '';
  let chip = null;
  if (my.videoColor) {
    let c = my.videoColor;
    let x = my.track_xi;
    let y = my.track_yi;
    let s = my.stepPx;
    chip = { x, y, s, c };
  }
  let userAgent = navigator.userAgent;

  let updates = { date_s, count, name_s, chip, userAgent };

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
  if (!my.stored_devices) return null;

  let device = my.stored_devices[key];
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
