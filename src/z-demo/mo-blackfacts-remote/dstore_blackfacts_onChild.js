//
function dstore_blackfacts_onChild({ mo_blackfacts_index_changed }) {
  // Setup listener for changes to firebase db device
  let { database, ref, onChildAdded, onChildChanged, onChildRemoved } = fb_.fbase;
  let path = `${my.dstore_rootPath}/${my.roomName}/mo-blackfacts`;
  let refPath = ref(database, path);

  onChildAdded(refPath, (data) => {
    receivedDeviceKey('dstore_blackfacts_onChild Added', data);
  });

  onChildChanged(refPath, (data) => {
    // console.log('dstore_blackfacts_onChild Changed', data);
    receivedDeviceKey('dstore_blackfacts_onChild Changed', data);
  });

  onChildRemoved(refPath, (data) => {
    receivedDeviceKey('dstore_blackfacts_onChild Removed', data, { remove: 1 });
  });

  function receivedDeviceKey(msg, data, remove) {
    let key = data.key;
    let val = data.val();
    // ui_log(msg, key, 'n=', Object.keys(val).length);
    ui_log(msg, 'key', key, 'val', val);
    if (remove) {
      return;
    }
    if (key == 'index') {
      let oldValue = my.blackfacts_index;
      my.blackfacts_index = val;
      if (mo_blackfacts_index_changed) {
        mo_blackfacts_index_changed(my.blackfacts_index, oldValue);
      }
    }
  }
}

// my.blackfacts_index
function dstore_blackfacts_update(index) {
  // console.log('dstore_blackfacts_update my.uid', my.uid);
  ui_log('dstore_blackfacts_update my.uid', my.uid);
  if (!my.uid) return;

  let { database, ref, update, increment } = fb_.fbase;
  let path = `${my.dstore_rootPath}/${my.roomName}/mo-blackfacts`;
  let refPath = ref(database, path);
  // ui_log('dstore_blackfacts_update', path);

  // let index = my.blackfacts_index;
  let count = increment(1);
  let dpath = `device/${my.uid}/count`;

  let updates = { index, [dpath]: count };

  ui_log('dstore_blackfacts_update updates', updates);

  update(refPath, updates);

  dstore_device_update();
}
