let my = {};

id_button_next.addEventListener('click', next_action);
id_button_previous.addEventListener('click', previous_action);
id_button_first.addEventListener('click', first_action);
id_button_random.addEventListener('click', random_action);
id_checkbox_loop.addEventListener('click', loop_action);

document.addEventListener('DOMContentLoaded', document_loaded);
ui_log(my, 'Hello ui_log');

function document_loaded() {
  let config = fb_.init('jht9629');
  // let config = fb_.init('jht1493');
  console.log('?v=66 config.projectId', config.projectId, 'configLabel', config.configLabel);

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
  id_blackfacts_num.innerHTML = 'Now showing on the big screen blackfacts ' + (newValue + 1) + '';
  my.blackfacts_index = newValue;
}

function loop_action() {
  ui_log(my, 'loop_action id_checkbox_loop.checked', id_checkbox_loop.checked);
  my.loop = id_checkbox_loop.checked;
  if (my.loop) {
    my.animLoop.start();
  }
}

function first_action() {
  ui_log(my, 'first_action');
  dstore_blackfacts_update(0);
}

function next_action() {
  ui_log(my, 'next_action');
  dstore_blackfacts_update((my.blackfacts_index + 1) % 366);
}

function previous_action() {
  ui_log(my, 'previous_action');
  dstore_blackfacts_update((my.blackfacts_index - 1 + 366) % 366);
}

function random_action() {
  ui_log(my, 'random_action');
  // my.blackfacts_index = int(random(0, 366));
  // my.blackfacts_index = Math.floor(Math.random() * 366);
  dstore_blackfacts_update(Math.floor(Math.random() * 366));
}

function ui_log(my, ...args) {
  console.log(...args);
}

function ui_error(...args) {
  ui_log(...args);
  alert(...args);
}

function step_animation(timeStamp) {
  // console.log('step_animation timeStamp', timeStamp);
  window.requestAnimationFrame(step_animation);
  if (!my.animLoop) return;
  my.animLoop.step({ action: stepAction, loop: my.loop });
  let lapse = my.animLoop.lapse() + ' ' + my.stepCount;
  if (!my.loop) lapse = '';
  id_lapse_report.innerHTML = lapse;
}

window.requestAnimationFrame(step_animation);

function stepAction() {
  console.log('stepAction ');
  next_action();
  my.stepCount++;
}

//
// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
