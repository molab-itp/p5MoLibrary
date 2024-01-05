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
      if (my.stored_pixgrids) {
        delete my.stored_pixgrids[key];
      }
      return;
    }
    if (!my.stored_devices) {
      my.stored_devices = {};
    }
    let device = my.stored_devices[key];
    if (!device) {
      // First use of device, add to my.stored_devices
      let uid = key;
      let index = Object.keys(my.stored_devices).length;
      let layer;
      let crossLayer;
      if (window.createGraphics) {
        layer = createGraphics(my.vwidth, my.vheight);
        crossLayer = createGraphics(my.vwidth, my.vheight);
      }
      device = { uid, index, layer, crossLayer };
      my.stored_devices[key] = device;
      my.ndevice = index + 1;
    }
    device.serverValues = val;
  }
}

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
