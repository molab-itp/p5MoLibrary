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
  console.log('?v=74 config.projectId', config.projectId, 'configLabel', config.configLabel);

  my.dstore_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.astro_index = 0;
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
      dstore_astro_onChild({ mo_astro_index_changed });
    })
    .catch((error) => {
      ui_log(my, 'dstore_init error', error);
    });
}

function mo_astro_index_changed(newValue, oldValue) {
  // console.log('mo_astro_index_changed newValue', newValue, 'oldValue', oldValue);
  id_astro_num.innerHTML = 'Now showing on the big screen astro ' + (newValue + 1) + '';
  my.astro_index = newValue;
  let ref = refBox_init.refs[my.astro_index];
  let regions = ref.regions;
  pan_draw(regions[1]);

  // let refBox_init = {
  //   refs: [
  //     {
  //       label: 'Sun',
  //       regions: [
  //         {
  //           x: 24,
  //           y: 25,
  //           w: 184,
  //           h: 370,
  //           z: 8,
  //         },
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
  dstore_astro_update(0);
}

function next_action() {
  ui_log(my, 'next_action');
  dstore_astro_update((my.astro_index + 1) % 210);
}

function previous_action() {
  ui_log(my, 'previous_action');
  dstore_astro_update((my.astro_index - 1 + 210) % 210);
}

function random_action() {
  ui_log(my, 'random_action');
  // my.astro_index = int(random(0, 210));
  // my.astro_index = Math.floor(Math.random() * 210);
  dstore_astro_update(Math.floor(Math.random() * 210));
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
