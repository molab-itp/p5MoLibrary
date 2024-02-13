//
// for chip
//   let x = my.track_xi;
//   let y = my.track_yi;
//   let s = my.stepPx;
//   let c = my.videoColor;

// !!@ use dbase_app_onChild
function dbase_pixchip_onChild() {
  //
  let { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved } = fireb_.fbase;
  // from "firebase/database";
  let path = `${my.dbase_rootPath}/${my.roomName}/mo-pixchip`;
  ui_log('dbase_pixchip_onChild path=', path);
  let refPath = ref(getDatabase(), path);

  onChildAdded(refPath, (data) => {
    receivedData('dbase_pixchip_onChild Added', data);
  });

  onChildChanged(refPath, (data) => {
    receivedData('dbase_pixchip_onChild Changed', data);
  });

  onChildRemoved(refPath, (data) => {
    receivedData('dbase_pixchip_onChild Removed', data, { remove: 1 });
  });

  function receivedData(msg, data, remove) {
    let key = data.key;
    let val = data.val();
    ui_log(msg, key, 'n=', val.length);

    // console.log('dbase_pixchip_onChild key, val', key, val);
    let device = dbase_device_fetch_pix(key);
    if (remove) {
      delete device.pixchips;
      return;
    }
    device.pixchips = val;
  }
}

function dbase_device_fetch_pix(key) {
  let device = dbase_device_fetch(key);
  if (!device.layer) {
    device.layer = createGraphics(my.vwidth, my.vheight);
    device.crossLayer = createGraphics(my.vwidth, my.vheight);
  }
  return device;
}

function dbase_pixchip_update() {
  if (!my.videoColor) {
    console.log('dbase_pixchip_update no my.videoColor', my.videoColor);
    return;
  }
  if (!my.uid) {
    ui_log('dbase_pixchip_update no uid', my.uid);
    return;
  }
  let { getDatabase, ref, update } = fireb_.fbase;
  let path = `${my.dbase_rootPath}/${my.roomName}/mo-pixchip/${my.uid}`;
  let refPath = ref(getDatabase(), path);

  let c = my.videoColor;
  let x = my.track_xi;
  let y = my.track_yi;
  let s = my.stepPx;
  chip = { x, y, s, c };

  update(refPath, chip);

  dbase_device_event_update();
}

// --

function dbase_pixchip_removeAll() {
  let { getDatabase, ref, set } = fireb_.fbase;
  let path = `${my.dbase_rootPath}/${my.roomName}/mo-pixchip`;
  let refPath = ref(getDatabase(), path);
  set(refPath, {})
    .then(() => {
      // Data saved successfully!
      // ui_log('dbase_removeAll OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log('dbase_removeAll error', error);
    });
}

function dbase_pixchip_remove() {
  let { getDatabase, ref, set } = fireb_.fbase;
  let path = `${my.dbase_rootPath}/${my.roomName}/mo-pixchip/${my.uid}`;
  let refPath = ref(getDatabase(), path);
  set(refPath, {})
    .then(() => {
      // Data saved successfully!
      // ui_log('dbase_pixchip_remove OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log('dbase_pixchip_remove error', error);
    });
}
