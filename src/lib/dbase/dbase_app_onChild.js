//
function dbase_app_onChild({ mo_app_key_value, mo_app_removed }) {
  // Setup listener for changes to firebase db device
  let { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved } = fireb_.fbase;
  let path = `${my.dbase_rootPath}/${my.roomName}/${my.mo_app}`;
  let refPath = ref(getDatabase(), path);

  onChildAdded(refPath, (data) => {
    receivedDeviceKey('dbase_app_onChild Added', data);
  });

  onChildChanged(refPath, (data) => {
    // console.log('dbase_app_onChild Changed', data);
    receivedDeviceKey('dbase_app_onChild Changed', data);
  });

  onChildRemoved(refPath, (data) => {
    receivedDeviceKey('dbase_app_onChild Removed', data, { remove: 1 });
  });

  function receivedDeviceKey(msg, data, remove) {
    let key = data.key;
    let value = data.val();
    // ui_log(msg, key, 'n=', Object.keys(val).length);
    // ui_log(msg, 'key', key, 'value', value);
    if (remove) {
      if (mo_app_removed) mo_app_removed(key, value);
      return;
    }
    if (mo_app_key_value) {
      // { index, qrcode }
      mo_app_key_value(key, value);
    }
  }
}
window.dbase_app_onChild = dbase_app_onChild;

//  props { index, qrcode, startup_time }
function dbase_app_update(props, deviceProps, groupProps) {
  // ui_log('dbase_app_update props', props, 'groupProps', groupProps);
  // ui_log('dbase_app_update props', props, 'deviceProps', deviceProps);
  // ui_log('dbase_app_update my.uid', my.uid);
  if (!my.uid) return;

  let { getDatabase, ref, update, increment } = fireb_.fbase;
  let path = `${my.dbase_rootPath}/${my.roomName}/${my.mo_app}`;
  let refPath = ref(getDatabase(), path);
  // ui_log('dbase_app_update', path);

  let updates = {};

  for (let prop in props) {
    updates[prop] = props[prop];
  }

  if (deviceProps == undefined) {
    deviceProps = { count: increment(1) };
  }

  for (let prop in deviceProps) {
    let value = deviceProps[prop];
    let dpath = `device/${my.uid}/${prop}`;
    updates[dpath] = value;
  }

  if (groupProps !== undefined) {
    let dpath = `group/${groupProps.group}/index`;
    updates[dpath] = groupProps.index;
  }

  // ui_log('dbase_app_update updates', updates);

  update(refPath, updates);

  dbase_device_event_update();
}
window.dbase_app_update = dbase_app_update;
