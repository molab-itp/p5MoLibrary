//

let my = {};

// console.log('BlackFacts index.js');

document.addEventListener('DOMContentLoaded', document_loaded);
// console.log('addEventListener document_loaded');

window.addEventListener('resize', position_bottom);

function document_loaded() {
  // console.log('document_loaded');

  my_init();

  // let config = fireb_.init('jht9629');
  // // let config = fireb_.init('jht1493');
  // console.log('?v=23 config.projectId', config.projectId);
  // console.log('configLabel', config.configLabel);

  dbase_app_init({ completed: app_init_completed });
}

function app_init_completed() {
  //
  // dbase_app_observe({ observed_key });
  dbase_app_observe({ observed_item });

  my.animLoop = new Anim({ target: my, time: my.animTime });

  if (my.isRemote) {
    my.pingLoop = new Anim({ target: my, time: my.pingTime, action: pingAction });
  }

  setup_animationFrame();

  function observed_item(item) {
    let index = item.index;
    if (index != null && index != my.blackfacts_index) {
      update_blackfacts_index(index);
    }
    let echo_delay = item.echo_delay;
    if (echo_delay != null && my.echo_delay != echo_delay) {
      my.echo_delay = echo_delay;
      video_play_index(my.blackfacts_index);
    }
  }
}

function update_blackfacts_index_dbase(index) {
  ui_log('update_blackfacts_index_dbase index', index, 'my.group', my.group);
  dbase_update_item({ index });
}

function my_init() {
  // console.log('my_init');
  //
  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.mo_app = 'mo-blackfacts';
  my.roomName = 'room0';
  // my.roomName = 'room1';
  my.blackfacts_index = -1;
  my.stepCount = 0;
  my.animTime = 7;
  my.nameDevice = 'device?v=23';
  my.pingTime = 1;

  // my.isRemote = window.innerHeight > window.innerWidth;
  my.isRemote = !params.qrcode;

  // idevice param renamed to group
  // however, still present in qr code
  my.idevice = params.idevice;
  console.log('my_init my.idevice', my.idevice);
  if (my.idevice) {
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
  dbase_device_updates({ portrait, group });
}

// function mo_blackfacts_group_value(newValue) {
//   console.log('mo_blackfacts_group_value my.group', my.group, 'newValue', newValue);
//   let group = my.group;
//   if (group) {
//     // broadcast group when has comma separated values
//     //  my.group=s1,s2,... --> group=s0
//     let groups = group.split(',');
//     if (groups.length > 1) {
//       // For broadcast group - Observe special group 0
//       group = 's0';
//     }
//   } else {
//     // Default group
//     group = 's0';
//   }
//   let item = newValue[group];
//   // console.log('mo_blackfacts_group_value item', item);
//   if (item) {
//     let index = item.index;
//     if (index != null && index != my.blackfacts_index) {
//       update_blackfacts_index(index);
//     }
//   }
// }

// function mo_blackfacts_device_value(newValue) {
//   // console.log('mo_blackfacts_device_value my.group', my.group, 'newValue', newValue);
// }

// function mo_blackfacts_index_value(newValue) {
//   if (!my.group) {
//     update_blackfacts_index(newValue);
//   } else {
//     console.log('mo_blackfacts_index_value !!@ Skipping newValue', newValue);
//   }
// }

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
  //
  let description = entry.description;
  let periodIndex = description.indexOf('Narrated by BlackFacts.com');
  if (periodIndex >= 0) {
    description = description.substring(0, periodIndex);
  }
  // console.log('update_blackfacts_num_ui description', description);
  let msg = '#' + (index + 1) + ' ' + description;
  show_message(msg);
}

function show_message(msg) {
  id_blackfacts_num.innerHTML = msg;
  id_message_text.innerHTML = id_blackfacts_num.innerHTML = msg;
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
