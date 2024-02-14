//
// for chip
//   let x = my.track_xi;
//   let y = my.track_yi;
//   let s = my.stepPx;
//   let c = my.videoColor;

function dbase_pix_chip_observe() {
  //
  dbase_event_observe(
    { changed_key_value, removed_key_value }, //
    { app: 'mo-pixchip', tag: 'dbase_pix_chip_observe' }
  );
  // let path = `${my.dbase_rootPath}/${my.roomName}/mo-pixchip`;

  function changed_key_value(key, value) {
    let device = dbase_device_fetch_pix(key);
    device.pixchips = value;
  }
  function removed_key_value(key, value) {
    let device = dbase_device_fetch_pix(key);
    delete device.pixchips;
  }
}

function dbase_device_fetch_pix(key) {
  let device = dbase_device_fetch(key);
  if (!device.layer) {
    device.layer = createGraphics(my.vwidth, my.vheight);
    device.crossLayer = createGraphics(my.vwidth, my.vheight);
  }
  return device;
}

function dbase_pix_chip_update() {
  if (!my.videoColor) {
    console.log('dbase_pix_chip_update no my.videoColor', my.videoColor);
    return;
  }
  let c = my.videoColor;
  let x = my.track_xi;
  let y = my.track_yi;
  let s = my.stepPx;
  let value = { x, y, s, c };

  dbase_update_value(value, { app: 'mo-pixchip', tag: 'dbase_pix_chip_update' });

  // let path = `${my.dbase_rootPath}/${my.roomName}/mo-pixchip/${my.uid}`;
}

// --

function dbase_pix_chip_removeAll() {
  let path = `${my.dbase_rootPath}/${my.roomName}/mo-pixchip`;
  let { getRefPath, set } = fireb_.fbase;
  let refPath = getRefPath(path);
  set(refPath, {})
    .then(() => {
      // Data saved successfully!
      // ui_log('dbase_removeAll OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log('dbase_removeAll error', error);
    });
}

function dbase_pix_chip_remove() {
  let path = `${my.dbase_rootPath}/${my.roomName}/mo-pixchip/${my.uid}`;
  let { getRefPath, set } = fireb_.fbase;
  let refPath = getRefPath(path);
  set(refPath, {})
    .then(() => {
      // Data saved successfully!
      // ui_log('dbase_pix_chip_remove OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log('dbase_pix_chip_remove error', error);
    });
}
