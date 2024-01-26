console.log('BlackFacts index');

// 2024-01-09 jht: page sometimes needs several reloads to show video

let my = {};

function my_init() {
  console.log('my_init');
  //
  my.isPortraitView = window.innerHeight > window.innerWidth;
  if (my.isPortraitView) {
    // PortraitView - no qrcode, show dashboard
    //
    qrcode_hide();
    {
      // place player below id_blackfacts_num
      let rects = id_blackfacts_num.getClientRects();
      let rt = rects[0];
      console.log('rt', rt);
      // let y = rt.y + rt.height;
      // let y = 200;
      // id_player.style.top = y + 'px';
    }
  } else {
    // Landscape - show qrcode, hide dashboard
    //
    id_dashboard.classList.add('hidden');
    {
      // place qrcode image at Bottom right
      let x = window.innerWidth - id_qrcode.clientWidth;
      let y = window.innerHeight - id_qrcode.clientHeight;
      id_qrcode.style.left = x + 'px';
      // id_qrcode.style.top = y + 'px';
    }
  }
}

function qrcode_hide() {
  id_qrcode.classList.add('hidden');
}

function qrcode_show() {
  id_qrcode.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', document_loaded);
console.log('addEventListener document_loaded');

function document_loaded() {
  //
  console.log('document_loaded');

  my_init();

  let config = fb_.init('jht9629');
  // let config = fb_.init('jht1493');
  console.log('?v=76 config.projectId', config.projectId, 'configLabel', config.configLabel);

  my.dstore_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.blackfacts_index = 0;
  my.stepCount = 0;
  my.animTime = 7;

  dstore_init();

  // my.animLoop = new Anim({ target: my, time: my.animTime });

  // setup_animationFrame();
}

function dstore_init() {
  let { signInAnonymously, auth } = fb_;
  signInAnonymously(auth)
    .then(() => {
      my.uid = auth.currentUser.uid;
      ui_log(my, 'dstore_init uid', my.uid);

      dstore_post_init();
    })
    .catch((error) => {
      ui_log(my, 'dstore_init error', error);
    });
}

function dstore_post_init() {
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
  let entry = dateFactForIndex(my.blackfacts_index);
  let description = entry.description;
  let periodIndex = description.indexOf('Narrated by BlackFacts.com');
  if (periodIndex >= 0) {
    description = description.substring(0, periodIndex);
  }
  // console.log('mo_blackfacts_index_value description', description);

  id_blackfacts_num.innerHTML = '#' + (newValue + 1) + ' ' + description;

  execCommandIndex(newValue);
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
