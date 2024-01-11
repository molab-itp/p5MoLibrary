console.log('BlackFacts index');

// 2024-01-09 jht: page sometimes needs several reloads to show video

{
  // place qrcode image at Bottom right
  let x = window.innerWidth - qrcode.clientWidth;
  let y = window.innerHeight - qrcode.clientHeight;
  qrcode.style.left = x + 'px';
  qrcode.style.top = y + 'px';
}

let my = {};

document.addEventListener('DOMContentLoaded', document_loaded);
// ui_log(my, 'Hello ui_log');

function document_loaded() {
  let config = fb_.init('jht9629');
  // let config = fb_.init('jht1493');
  console.log('?v=63 config.projectId', config.projectId, 'configLabel', config.configLabel);

  my.dstore_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.blackfacts_index = 0;
  my.stepCount = 0;

  dstore_init();

  my.animLoop = new Anim({ target: my, time: 15 });
}

function dstore_init() {
  let { signInAnonymously, auth } = fb_;
  signInAnonymously(auth)
    .then(() => {
      my.uid = auth.currentUser.uid;
      ui_log(my, 'dstore_init', my.uid);

      dstore_device_onChild();
      dstore_blackfacts_onChild({ mo_blackfacts_index_changed });
    })
    .catch((error) => {
      ui_log(my, 'dstore_init error', error);
    });
}

function mo_blackfacts_index_changed(newValue, oldValue) {
  console.log('mo_blackfacts_index_changed newValue', newValue, 'oldValue', oldValue);
  my.blackfacts_index = newValue;
  execCommandIndex(newValue);
}

function ui_log(my, ...args) {
  // console.log(...args);
}

function ui_error(...args) {
  ui_log(...args);
  alert(...args);
}
