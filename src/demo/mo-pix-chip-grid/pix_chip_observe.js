//
// for chip
//   let x = my.track_xi;
//   let y = my.track_yi;
//   let s = my.stepPx;
//   let c = my.videoColor;

function pix_chip_observe() {
  //
  dbase_app_observe(
    { observed_device, removed_device }, //
    { app: 'mo-pix-chip', tag: 'pix_chip_observe' }
  );
  // let path = `${my.dbase_rootPath}/${my.roomName}/mo-pix-chip`;

  function observed_device(key, value) {
    let device = dbase_device_fetch_pix(key);
    device.pixchips = value;
  }
  function removed_device(key, value) {
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

function pix_chip_update() {
  if (!my.videoColor) {
    console.log('pix_chip_update no my.videoColor', my.videoColor);
    return;
  }
  let c = my.videoColor;
  let x = my.track_xi;
  let y = my.track_yi;
  let s = my.stepPx;
  let value = { x, y, s, c };

  dbase_update_value(value, { app: 'mo-pix-chip', tag: 'pix_chip_update' });

  // let path = `${my.dbase_rootPath}/${my.roomName}/mo-pix-chip/${my.uid}`;
}

// --

function pix_chip_removeAll() {
  let path = `${my.dbase_rootPath}/${my.roomName}/mo-pix-chip`;
  let { getRefPath, set } = fireb_.fbase;
  let refPath = getRefPath(path);
  set(refPath, {})
    .then(() => {
      // Data saved successfully!
      // ui_log('pix_chip_removeAll OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log('pix_chip_removeAll error', error);
    });
}

function pix_chip_remove() {
  let path = `${my.dbase_rootPath}/${my.roomName}/mo-pix-chip/${my.uid}`;
  let { getRefPath, set } = fireb_.fbase;
  let refPath = getRefPath(path);
  set(refPath, {})
    .then(() => {
      // Data saved successfully!
      // ui_log('pix_chip_remove OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log('pix_chip_remove error', error);
    });
}
