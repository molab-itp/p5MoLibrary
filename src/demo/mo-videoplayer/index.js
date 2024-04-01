//

// console.log('BlackFacts index.js');

document.addEventListener('DOMContentLoaded', document_loaded);
// console.log('addEventListener document_loaded');
function document_loaded() {
  // console.log('document_loaded');

  my_init();

  // let config = fireb_.init('jht9629');
  // // let config = fireb_.init('jht1493');
  // console.log('?v=66 config.projectId', config.projectId);
  // console.log('configLabel', config.configLabel);

  dbase_app_init({ completed: dbase_host_init });
}

// window.addEventListener('resize', position_bottom);

function dbase_host_init() {
  //
  // dbase_app_observe({ observed_key: observed_key });
  // dbase_devices_observe({ observed_item });

  dbase_app_observe({ observed_item });

  my.animLoop = new Anim({ target: my, time: my.animTime });

  if (my.isRemote) {
    my.pingLoop = new Anim({ target: my, time: my.pingTime, action: pingAction });
  }

  setup_animationFrame();

  function observed_item(value) {
    // console.log('observed_item value', value);
    // not used
  }
}

let my = {};

function my_init() {
  // console.log('my_init');
  //
  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.mo_app = 'mo-blackfacts';
  my.roomName = 'room0';
  my.blackfacts_index = -1;
  my.stepCount = 0;
  my.animTime = 7;
  my.nameDevice = 'device?v=66';
  my.pingTime = 1;
  // my.leftMargin = 10;
  my.group = 'nation_time';

  // my.isRemote = window.innerHeight > window.innerWidth;
  my.isRemote = !params.qrcode;

  // idevice param renamed to group
  // however, still present in qr code
  my.idevice = params.idevice;
  console.log('my_init my.idevice', my.idevice);
  if (my.idevice && !my.group) {
    my.group = 's' + my.idevice;
  }
  if (!my.group) {
    my.group = params.group;
  }
  console.log('my_init my.group', my.group);
  if (my.group) {
    id_title.innerHTML += ' (' + my.group + ')';
  }
  if (params.room) {
    my.roomName = params.room;
  }

  ui_init();
}

function pingAction() {
  let portrait = my.isRemote ? 1 : 0;
  let group = my.group;
  dbase_site_updates({ portrait, group });
}

// Check for matching update to group
function mo_blackfacts_device_value(newValue) {
  // console.log('mo_blackfacts_device_value my.group', my.group, 'newValue', newValue);
}

function mo_blackfacts_index_value(newValue) {
  if (!my.group) {
    update_blackfacts_index(newValue);
  } else {
    console.log('mo_blackfacts_index_value !!@ Skipping newValue', newValue);
  }
}

function update_blackfacts_index(newValue) {
  console.log('update_blackfacts_index newValue', newValue);
  my.blackfacts_index = newValue;

  update_blackfacts_num_ui();

  video_play_index(my.blackfacts_index);
}

function update_blackfacts_num_ui() {
  // url title param will be displayed in animationFrame_callback
  if (params.title) {
    return;
  }
  let index = my.blackfacts_index;
  let entry = dateFactForIndex(index);
  if (!entry) {
    console.log('update_blackfacts_num_ui no entry index', index);
    return;
  }
  //
  let description = entry.description;
  let periodIndex = description.indexOf('Narrated by BlackFacts.com');
  if (periodIndex >= 0) {
    description = description.substring(0, periodIndex);
  }
  // console.log('mo_blackfacts_index_value description', description);
  let msg = '#' + (index + 1) + ' ' + description;
  show_message(msg);
}

function show_message(msg) {
  id_blackfacts_num.innerHTML = msg;
  id_message_text.innerHTML = msg;
}

function mo_blackfacts_qccode_value(newValue) {
  // console.log('mo_blackfacts_qccode_value newValue', newValue);
  my.blackfacts_qrcode = newValue;
}

function ui_log(...args) {
  console.log(...args);
}

function ui_error(...args) {
  ui_log(...args);
  alert(...args);
}
