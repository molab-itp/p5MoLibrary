//
// my dbStoreRootPath: 'm0-@r-@w-',
// dbStoreRootPath/room0/device {
// dbStoreRootPath/room0/pix
//

function dstore_pixgrid_onChild() {
  //
  let { database, ref, onChildAdded, onChildChanged, onChildRemoved } = fb_.fbase;
  // from "firebase/database";
  let path = `${my.dstore_rootPath}/${my.roomName}/mo-pixgrid`;
  ui_log('dstore_pixgrid_onChild path=', path);
  let refPath = ref(database, path);

  onChildAdded(refPath, (data) => {
    receivedPixKey('dstore_pixgrid_onChild Added', data);
  });

  onChildChanged(refPath, (data) => {
    receivedPixKey('dstore_pixgrid_onChild Changed', data);
  });

  onChildRemoved(refPath, (data) => {
    receivedPixKey('dstore_pixgrid_onChild Removed', data, { remove: 1 });
  });

  function receivedPixKey(msg, data, remove) {
    let key = data.key;
    let val = data.val();
    ui_log(msg, key, 'n=', val.length);
    let device = dstore_device_fetch_pix(key);
    if (remove) {
      delete device.pixgrids;
      return;
    }
    device.pixgrids = val;
    // console.log('device.pixgrids key', key, 'val', val);
    // console.log('device.pixgrids key', key, 'val n', val.length);
  }
}

function dstore_pixgrid_update(irow, stepPx, row) {
  let { database, ref, update } = fb_.fbase;
  if (!my.uid) {
    ui_log('dstore_pixgrid_update no uid', my.uid);
    return;
  }
  let path = `${my.dstore_rootPath}/${my.roomName}/mo-pixgrid/${my.uid}/${irow}`;
  let refPath = ref(database, path);
  let i = irow;
  let s = stepPx;
  update(refPath, { i, s, row });

  dstore_device_update();
}

// db goes to read-only mode when nstep=128
function dstore_pixgrid_removeAll() {
  let { database, ref, set } = fb_.fbase;
  let path = `${my.dstore_rootPath}/${my.roomName}/mo-pixgrid`;
  let refPath = ref(database, path);
  set(refPath, {})
    .then(() => {
      // Data saved successfully!
      // ui_log('dstore_removeAll OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log('dstore_removeAll error', error);
    });
}

function dstore_pixgrid_remove() {
  let { database, ref, set } = fb_.fbase;
  let path = `${my.dstore_rootPath}/${my.roomName}/mo-pixgrid/${my.uid}`;
  let refPath = ref(database, path);
  set(refPath, {})
    .then(() => {
      // Data saved successfully!
      // ui_log('dstore_pixgrid_remove OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log('dstore_pixgrid_remove error', error);
    });
}

function dstore_remove() {
  dstore_device_remove();
  dstore_pixgrid_remove();
  delete my.stored_devices;
}

// https://console.firebase.google.com/u/0/project/molab-485f5/database/molab-485f5-default-rtdb/data

// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0

// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0#read_data_once_with_an_observer

// https://firebase.google.com/docs/reference/js/database.datasnapshot?authuser=0

// https://firebase.google.com/docs/reference/js/database?authuser=0

// https://firebase.google.com/docs/reference/js/database.md?authuser=0#onchildadded
