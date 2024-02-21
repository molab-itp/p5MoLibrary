function dbase_a_devices_observe({ observe_a_devices }) {
  //
  if (!my.a_device_values) my.a_device_values = {};

  // 'mo-paint/a_device'
  dbase_event_observe(
    { changed_key_value, removed_key_value }, //
    { app: my.mo_app + '/a_device' }
  );

  // dbase_event_observe --> dbase_observe_devices
  //

  function changed_key_value(key, value) {
    // console.log('changed_key_value key', key, 'value', value);
    my.a_device_values[key] = value;
    build_devices(key);
  }

  function removed_key_value(key, value) {
    console.log('removed_key_value key', key, 'value', value);
    delete my.a_device_values[key];
    build_devices(key);
  }

  // ?? can performance improved by knowing that only specific device is updated?
  // Collection list of active devices and keep current in sync
  //
  function build_devices(key) {
    // console.log('build_devices key', key);
    //
    let allDevices = dbase_device_summary();
    let devices = [];
    for (let index = 0; index < allDevices.length; index++) {
      let adevice = allDevices[index];
      let uid = adevice.uid;
      let device = my.a_device_values[uid];
      if (device && device_uid_isActive(uid)) {
        device.uid = uid;
        devices.push(device);
      }
    }
    my.a_devices = devices;

    if (observe_a_devices) observe_a_devices(key);
  }
}

function dbase_a_devices() {
  if (!my.a_devices) my.a_devices = [];
  return my.a_devices;
}

function dbase_a_device_for_uid(uid) {
  // console.log('dbase_a_device_for_uid uid', uid, my.a_device_values[uid]);
  if (!my.a_device_values) my.a_device_values = {};
  return my.a_device_values[uid];
}

// throttle update to queue to time
//
function dbase_queue_update(props) {
  //
  if (!my.db_queue) {
    my.db_queue = {};
    my.db_queue_loop = new Anim({ time: 0.25, action: check_queue });
    my.db_queue_count = 0;
    my.db_queue_count_last = 0;
  }
  Object.assign(my.db_queue, props);
  my.db_queue_count++;
  function check_queue() {
    // console.log('check_queue db_queue_count_last', my.db_queue_count_last, my.db_queue_count);
    if (my.db_queue_count_last != my.db_queue_count) {
      my.db_queue_count_last = my.db_queue_count;

      dbase_update_props({}, my.db_queue);

      my.db_queue = {};
    }
  }
}

function dbase_poll() {
  if (my.db_queue_loop) {
    my.db_queue_loop.step({ loop: 1 });
  }
}

// dbase_issue_actions( {clear_action: 1} )
//
function dbase_issue_actions(actions) {
  //
  let nactions = {};
  for (let act of actions) {
    nactions[act] = dbase_value_increment(1);
  }
  // dbase_queue_update({ clear_action: dbase_value_increment(1) });
  dbase_queue_update(nactions);
}

// dbase_actions_issued(my, { clear_action: 1})
//
function dbase_actions_issued(my, actions) {
  //
  let actionSeen = 0;
  if (!my.db_actions_state) my.db_actions_state = {};
  if (!my.db_last_actions_state) my.db_last_actions_state = {};
  for (let act of actions) {
    if (my.db_last_actions_state[act] != my.db_actions_state[act]) {
      my.db_last_actions_state[act] = my.db_actions_state[act];
      actionSeen++;
    }
  }
  return actionSeen;
}
