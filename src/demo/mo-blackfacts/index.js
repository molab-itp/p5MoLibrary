//

console.log('BlackFacts index.js');

// 2024-01-09 jht: page sometimes needs several reloads to show video

document.addEventListener('DOMContentLoaded', document_loaded);
console.log('addEventListener document_loaded');
function document_loaded() {
  //
  console.log('document_loaded');

  my_init();

  let config = fb_.init('jht9629');
  // let config = fb_.init('jht1493');
  console.log('?v=96 config.projectId', config.projectId, 'configLabel', config.configLabel);

  dstore_signIn();
}

let my = {};

function my_init() {
  // console.log('my_init');
  //
  my.dstore_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.blackfacts_index = 0;
  my.stepCount = 0;
  my.animTime = 7;
  my.nameDevice = 'device?v=96';

  my.isPortraitView = window.innerHeight > window.innerWidth;

  ui_init();
}

function dstore_signIn() {
  let { signInAnonymously, auth } = fb_;
  signInAnonymously(auth)
    .then(() => {
      my.uid = auth.currentUser.uid;
      ui_log(my, 'dstore_init uid', my.uid);

      dstore_app_init();
    })
    .catch((error) => {
      ui_log(my, 'dstore_init error', error);
    });
}

function dstore_app_init() {
  //
  dstore_device_onChild();

  dstore_blackfacts_onChild({ mo_blackfacts_key_value });

  my.animLoop = new Anim({ target: my, time: my.animTime });

  setup_animationFrame();
}

function mo_blackfacts_key_value(key, value) {
  switch (key) {
    case 'index':
      mo_blackfacts_index_value(value);
      break;
    case 'qrcode':
      mo_blackfacts_qccode_value(value);
      break;
  }
}

function mo_blackfacts_index_value(newValue) {
  console.log('mo_blackfacts_index_value newValue', newValue);
  my.blackfacts_index = newValue;

  update_blackfacts_num_ui();

  execCommandIndex(my.blackfacts_index);
}

function update_blackfacts_num_ui() {
  // url title param will be displayed in animationFrame_callback
  if (params.title) {
    return;
  }
  let index = my.blackfacts_index;
  let entry = dateFactForIndex(index);
  //
  let description = entry.description;
  let periodIndex = description.indexOf('Narrated by BlackFacts.com');
  if (periodIndex >= 0) {
    description = description.substring(0, periodIndex);
  }
  // console.log('mo_blackfacts_index_value description', description);
  let str = '#' + (index + 1) + ' ' + description;
  id_blackfacts_num.innerHTML = str;
  id_message_text.innerHTML = str;
}

function mo_blackfacts_qccode_value(newValue) {
  console.log('mo_blackfacts_qccode_value newValue', newValue);
  my.blackfacts_qrcode = newValue;
}

function ui_log(my, ...args) {
  console.log(...args);
}

function ui_error(...args) {
  ui_log(...args);
  alert(...args);
}
