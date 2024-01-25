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
  console.log('?v=74 config.projectId', config.projectId, 'configLabel', config.configLabel);

  my.dstore_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.blackfacts_index = 0;
  my.stepCount = 0;
  my.animTime = 7;

  dstore_init();

  my.animLoop = new Anim({ target: my, time: my.animTime });

  window.requestAnimationFrame(step_animation);
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

  let entry = fotdEntry(my.blackfacts_index);
  let description = entry.description;
  // console.log('mo_blackfacts_index_changed description', description);
  let periodIndex = description.indexOf('Narrated by BlackFacts.com');
  // let periodIndex = description.indexOf('.  Narrated');
  if (periodIndex >= 0) {
    description = description.substring(0, periodIndex);
  }
  // console.log('mo_blackfacts_index_changed description', description);

  id_blackfacts_num.innerHTML = '#' + (newValue + 1) + ' ' + description;

  execCommandIndex(newValue);
}

function ui_log(my, ...args) {
  console.log(...args);
}

function ui_error(...args) {
  ui_log(...args);
  alert(...args);
}
