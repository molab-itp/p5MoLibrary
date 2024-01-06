let my = {};

id_button_next.addEventListener('click', next_action);
id_button_previous.addEventListener('click', previous_action);
id_button_first.addEventListener('click', first_action);
id_button_random.addEventListener('click', random_action);

document.addEventListener('DOMContentLoaded', document_loaded);
ui_log(my, 'Hello ui_log');

function document_loaded() {
  // console.log('DOM fully loaded and parsed');
  // console.log('Hello');
  let config = fb_.init('jht1493');
  console.log('?v=47 config.projectId', config.projectId, 'configLabel', config.configLabel);

  my.dstore_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.astro_index = 0;

  dstore_init();
}

function dstore_init() {
  let { signInAnonymously, auth } = fb_;
  signInAnonymously(auth)
    .then(() => {
      my.uid = auth.currentUser.uid;
      ui_log(my, 'dstore_init', my.uid);

      dstore_device_update();
      dstore_device_onChild();
      dstore_astro_onChild({ mo_astro_index_changed });
    })
    .catch((error) => {
      ui_log(my, 'dstore_init error', error);
    });
}

function mo_astro_index_changed(newValue, oldValue) {
  console.log('mo_astro_index_changed newValue', newValue, 'oldValue', oldValue);
  id_astro_num.innerHTML = 'astro num=' + (newValue + 1) + '';
}

function first_action() {
  ui_log(my, 'first_action');
  my.astro_index = 0;
  dstore_astro_update();
}

function next_action() {
  ui_log(my, 'next_action');
  my.astro_index = (my.astro_index + 1) % 210;
  dstore_astro_update();
}

function previous_action() {
  ui_log(my, 'previous_action');
  my.astro_index = (my.astro_index - 1 + 210) % 210;
  dstore_astro_update();
}

function random_action() {
  ui_log(my, 'random_action');
  // my.astro_index = int(random(0, 210));
  my.astro_index = Math.floor(Math.random() * 210);
  dstore_astro_update();
}

function ui_log(my, ...args) {
  console.log(...args);
}

function ui_error(...args) {
  ui_log(...args);
  alert(...args);
}

//
