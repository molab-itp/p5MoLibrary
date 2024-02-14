//
function dbase_app_event({ changed_key_value, removed_key_value }, apps) {
  // apps = { app, tag }
  let app = my.mo_app;
  let tag = 'dbase_app_event';
  if (apps) {
    app = apps.app || app;
    tag = apps.tag || tag;
  }
  // Setup listener for changes to firebase db device
  let path = `${my.dbase_rootPath}/${my.roomName}/${app}`;
  let { getRefPath, onChildAdded, onChildChanged, onChildRemoved } = fireb_.fbase;
  let refPath = getRefPath(path);

  onChildAdded(refPath, (data) => {
    receivedDeviceKey('Added', data);
  });

  onChildChanged(refPath, (data) => {
    // console.log('Changed', data);
    receivedDeviceKey('Changed', data);
  });

  onChildRemoved(refPath, (data) => {
    receivedDeviceKey('Removed', data, { remove: 1 });
  });

  function receivedDeviceKey(op, data, remove) {
    let msg = tag + ' ' + op;
    let key = data.key;
    let value = data.val();
    // ui_log(msg, key, 'n=', Object.keys(val).length);
    ui_log(msg, 'key', key, 'value', value);
    if (remove) {
      if (removed_key_value) removed_key_value(key, value);
      return;
    }
    if (changed_key_value) {
      // { index, qrcode }
      changed_key_value(key, value);
    }
  }
}
window.dbase_app_event = dbase_app_event;

//  props { index, qrcode, startup_time }
function dbase_app_update(props, deviceProps, groupProps) {
  // ui_log('dbase_app_update props', props, 'groupProps', groupProps);
  // ui_log('dbase_app_update props', props, 'deviceProps', deviceProps);
  // ui_log('dbase_app_update my.uid', my.uid);
  if (!my.uid) {
    return;
  }
  let path = `${my.dbase_rootPath}/${my.roomName}/${my.mo_app}`;
  let { getRefPath, update, increment } = fireb_.fbase;
  let refPath = getRefPath(path);
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
    // !!@ Consider hanlding more than index as group prop
    let dpath = `group/${groupProps.group}/index`;
    updates[dpath] = groupProps.index;
  }

  // ui_log('dbase_app_update updates', updates);

  update(refPath, updates);

  dbase_device_event_update();
}
window.dbase_app_update = dbase_app_update;
