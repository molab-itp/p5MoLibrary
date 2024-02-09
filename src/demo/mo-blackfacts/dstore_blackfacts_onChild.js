//
// function dstore_blackfacts_onChild({ mo_blackfacts_index_changed, mo_blackfacts_qccode_changed }) {
function dstore_blackfacts_onChild({ mo_blackfacts_key_value }) {
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
    let value = data.val();
    // ui_log(my, msg, key, 'n=', Object.keys(val).length);
    // ui_log(my, msg, 'key', key, 'value', value);
    if (remove) {
      return;
    }
    if (mo_blackfacts_key_value) {
      // { index, qrcode }
      mo_blackfacts_key_value(key, value);
    }
  }
}

//  props { index, qrcode, startup_time }
function dstore_blackfacts_update(props, deviceProps, ideviceProps) {
  ui_log(my, 'dstore_blackfacts_update props', props, 'ideviceProps', ideviceProps);
  // ui_log(my, 'dstore_blackfacts_update props', props, 'deviceProps', deviceProps);
  // ui_log(my, 'dstore_blackfacts_update my.uid', my.uid);
  if (!my.uid) return;

  let { database, ref, update, increment } = fb_.fbase;
  let path = `${my.dstore_rootPath}/${my.roomName}/mo-blackfacts`;
  let refPath = ref(database, path);
  // ui_log(my, 'dstore_blackfacts_update', path);

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

  if (ideviceProps !== undefined) {
    let dpath = `idevice/${ideviceProps.idevice - 1}/index`;
    updates[dpath] = ideviceProps.index;
  }

  ui_log(my, 'dstore_blackfacts_update updates', updates);

  update(refPath, updates);
  ``;
  dstore_device_update();
}
