//
function pix_grid_observe() {
  //
  dbase_app_observe(
    { observed_device, removed_device }, //
    { app: 'mo-pix-grid', tag: 'pix_grid_observe' }
  );
  // let path = `${my.dbase_rootPath}/${my.roomName}/mo-pix-grid`;

  function observed_device(key, value) {
    let device = dbase_device_fetch_pix(key);
    device.pixgrids = value;
  }
  function removed_device(key, value) {
    let device = dbase_device_fetch_pix(key);
    delete device.pixgrids;
  }
}

function pix_grid_update_irow(irow, stepPx, row) {
  //
  let i = irow;
  let s = stepPx;
  let value = { i, s, row };

  dbase_update_value(value, { app: 'mo-pix-grid', tag: 'pix_grid_update_irow', suffix: irow });

  // let path = `${my.dbase_rootPath}/${my.roomName}/mo-pix-grid/${my.uid}/${irow}`;
}

// db goes to read-only mode when nstep=128
function pix_grid_removeAll() {
  let path = `${my.dbase_rootPath}/${my.roomName}/mo-pix-grid`;
  let { getRefPath, set } = fireb_.fbase;
  let refPath = getRefPath(path);
  set(refPath, {})
    .then(() => {
      // Data saved successfully!
      // ui_log('pix_grid_removeAll OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log('pix_grid_removeAll error', error);
    });
}

function pix_grid_remove() {
  let path = `${my.dbase_rootPath}/${my.roomName}/mo-pix-grid/${my.uid}`;
  let { getRefPath, set } = fireb_.fbase;
  let refPath = getRefPath(path);
  set(refPath, {})
    .then(() => {
      // Data saved successfully!
      // ui_log('pix_grid_remove OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log('pix_grid_remove error', error);
    });
}

function app_pix_grid_remove() {
  dbase_device_remove();
  pix_grid_remove();
  delete my.fireb_devices;
}

// https://console.firebase.google.com/u/0/project/molab-485f5/database/molab-485f5-default-rtdb/data

// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0

// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0#read_data_once_with_an_observer

// https://firebase.google.com/docs/reference/js/database.datasnapshot?authuser=0

// https://firebase.google.com/docs/reference/js/database?authuser=0

// https://firebase.google.com/docs/reference/js/database.md?authuser=0#onchildadded
