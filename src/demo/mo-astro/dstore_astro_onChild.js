//
function dstore_astro_onChild({ mo_astro_index_changed }) {
  // Setup listener for changes to firebase db device
  let { database, ref, onChildAdded, onChildChanged, onChildRemoved } = fb_.fbase;
  let path = `${my.dstore_rootPath}/${my.roomName}/mo-astro`;
  let refPath = ref(database, path);

  onChildAdded(refPath, (data) => {
    receivedDeviceKey('dstore_astro_onChild Added', data);
  });

  onChildChanged(refPath, (data) => {
    // console.log('dstore_astro_onChild Changed', data);
    receivedDeviceKey('dstore_astro_onChild Changed', data);
  });

  onChildRemoved(refPath, (data) => {
    receivedDeviceKey('dstore_astro_onChild Removed', data, { remove: 1 });
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
      let oldValue = my.astro_index;
      my.astro_index = val;
      if (mo_astro_index_changed) {
        mo_astro_index_changed(my.astro_index, oldValue);
      }
    } else if (key == 'play_step') {
      my.play_step = val;
    } else if (key == 'show_qrcode') {
      my.show_qrcode = val;
    }
  }
}

// my.astro_index
function dstore_astro_update({ index, play_step, show_qrcode }) {
  // console.log('dstore_astro_update my.uid', my.uid);
  ui_log('dstore_astro_update my.uid', my.uid);
  if (!my.uid) return;

  let { database, ref, update, increment } = fb_.fbase;
  let path = `${my.dstore_rootPath}/${my.roomName}/mo-astro`;
  let refPath = ref(database, path);
  // ui_log('dstore_astro_update', path);

  // let index = my.astro_index;
  let count = increment(1);
  let dpath = `device/${my.uid}/count`;

  let updates = { [dpath]: count };

  if (index !== undefined) updates.index = index;
  if (play_step !== undefined) updates.play_step = play_step;
  if (show_qrcode !== undefined) updates.show_qrcode = show_qrcode;

  ui_log('dstore_astro_update updates', updates);

  update(refPath, updates);

  dstore_device_update();
}
