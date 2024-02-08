//
// for chip
//   let x = my.track_xi;
//   let y = my.track_yi;
//   let s = my.stepPx;
//   let c = my.videoColor;

function dstore_pixchip_onChild() {
  //
  let { database, ref, onChildAdded, onChildChanged, onChildRemoved } = fb_.fbase;
  // from "firebase/database";
  let path = `${my.dstore_rootPath}/${my.roomName}/mo-pixchip`;
  ui_log(my, 'dstore_pixchip_onChild path=', path);
  let refPath = ref(database, path);

  onChildAdded(refPath, (data) => {
    receivedData('dstore_pixchip_onChild Added', data);
  });

  onChildChanged(refPath, (data) => {
    receivedData('dstore_pixchip_onChild Changed', data);
  });

  onChildRemoved(refPath, (data) => {
    receivedData('dstore_pixchip_onChild Removed', data, { remove: 1 });
  });

  function receivedData(msg, data, remove) {
    let key = data.key;
    let val = data.val();
    ui_log(my, msg, key, 'n=', val.length);

    // console.log('dstore_pixchip_onChild key, val', key, val);
    let device = dstore_device_fetch(key);
    if (remove) {
      delete device.pixchips;
      return;
    }
    device.pixchips = val;
  }
}

function dstore_pixchip_update() {
  if (!my.videoColor) {
    console.log('dstore_pixchip_update no my.videoColor', my.videoColor);
    return;
  }
  if (!my.uid) {
    ui_log(my, 'dstore_pixchip_update no uid', my.uid);
    return;
  }
  let { database, ref, update } = fb_.fbase;
  let path = `${my.dstore_rootPath}/${my.roomName}/mo-pixchip/${my.uid}`;
  let refPath = ref(database, path);

  let c = my.videoColor;
  let x = my.track_xi;
  let y = my.track_yi;
  let s = my.stepPx;
  chip = { x, y, s, c };

  update(refPath, chip);

  dstore_device_update();
}

// --

function dstore_pixchip_removeAll() {
  let { database, ref, set } = fb_.fbase;
  let path = `${my.dstore_rootPath}/${my.roomName}/mo-pixchip`;
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

function dstore_pixchip_remove() {
  let { database, ref, set } = fb_.fbase;
  let path = `${my.dstore_rootPath}/${my.roomName}/mo-pixchip/${my.uid}`;
  let refPath = ref(database, path);
  set(refPath, {})
    .then(() => {
      // Data saved successfully!
      // ui_log(my, 'dstore_pixchip_remove OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log(my, 'dstore_pixchip_remove error', error);
    });
}
