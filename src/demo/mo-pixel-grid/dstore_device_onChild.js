function dstore_device_onChild() {
  // Setup listener for changes to firebase db device
  let { database, ref, onChildAdded, onChildChanged, onChildRemoved } = fb_.fbase;
  let path = `${my.dstore_rootPath}/${my.roomName}/device`;
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
      if (my.stored_devices) {
        delete my.stored_devices[key];
        my.ndevice = Object.keys(my.stored_devices).length;
      }
      return;
    }
    dstore_fetch_device(key, val);
  }
}

function dstore_fetch_device(uid, val) {
  if (!my.stored_devices) {
    my.stored_devices = {};
  }
  let device = my.stored_devices[uid];
  let fresh = 0;
  if (!device) {
    // First use of device, add to my.stored_devices
    let index = Object.keys(my.stored_devices).length;
    let layer;
    let crossLayer;
    // in p5js allocate graphics layers
    if (window.createGraphics && my.vwidth) {
      layer = createGraphics(my.vwidth, my.vheight);
      crossLayer = createGraphics(my.vwidth, my.vheight);
    }
    device = { uid, index, layer, crossLayer };
    my.stored_devices[uid] = device;
    my.ndevice = index + 1;
    fresh = 1;
  }
  if (val) {
    device.serverValues = val;
  }
  if (fresh && uid == my.uid) {
    // device must be inited to record visit event
    dstore_device_visit();
  }
  return device;
}

// --

function dstore_device_remove() {
  let { database, ref, set } = fb_.fbase;
  let path = `${my.dstore_rootPath}/${my.roomName}/device/${my.uid}`;
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
