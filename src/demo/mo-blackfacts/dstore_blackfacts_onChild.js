//
function dstore_blackfacts_onChild({ mo_blackfacts_index_changed, mo_blackfacts_qccode_changed }) {
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
    // ui_log(my, msg, key, 'n=', Object.keys(val).length);
    ui_log(my, msg, 'key', key, 'val', val);
    if (remove) {
      return;
    }
    if (key == 'index') {
      let oldValue = my.blackfacts_index;
      my.blackfacts_index = val;
      if (mo_blackfacts_index_changed) {
        mo_blackfacts_index_changed(my.blackfacts_index, oldValue);
      }
    } else if (key == 'qrcode') {
      let oldValue = my.blackfacts_qrcode;
      my.blackfacts_qrcode = val;
      if (mo_blackfacts_qccode_changed) {
        mo_blackfacts_qccode_changed(my.blackfacts_qrcode, oldValue);
      }
    }
  }
}

// my.blackfacts_index
// function dstore_blackfacts_update({ index, qrcode }) {
function dstore_blackfacts_update(props) {
  // console.log('dstore_blackfacts_update my.uid', my.uid);
  ui_log(my, 'dstore_blackfacts_update my.uid', my.uid);
  if (!my.uid) return;

  let { database, ref, update, increment } = fb_.fbase;
  let path = `${my.dstore_rootPath}/${my.roomName}/mo-blackfacts`;
  let refPath = ref(database, path);
  // ui_log(my, 'dstore_blackfacts_update', path);

  let count = increment(1);
  let dpath = `device/${my.uid}/count`;

  let updates = { [dpath]: count };

  for (let prop in props) {
    updates[prop] = props[prop];
  }
  // if (index !== undefined) updates.index = index;
  // if (qrcode !== undefined) updates.qrcode = qrcode;

  ui_log(my, 'dstore_blackfacts_update updates', updates);

  update(refPath, updates);

  dstore_device_update();
}
