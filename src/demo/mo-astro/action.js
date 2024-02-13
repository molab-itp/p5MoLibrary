// function mo_astro_index_changed(newValue, oldValue) {
//   console.log('mo_astro_index_changed newValue', newValue, 'oldValue', oldValue);
//   refIndexAssign(newValue);
//   my.astro_index = newValue;
// }

function mo_astro_index_changed(newValue, oldValue) {
  console.log('mo_astro_index_changed newValue', newValue, 'oldValue', oldValue);
  // id_astro_num.innerHTML = 'Now showing on the big screen astro ' + (newValue + 1) + '';
  // my.astro_index = newValue;
  // let ref = refBox_init.refs[my.astro_index];
  // let regions = ref.regions;
  // pan_draw(regions[1]);
  refIndexAssign(newValue);
}

function loop_action() {
  ui_log('loop_action id_checkbox_loop.checked', id_checkbox_loop.checked);
  my.loop = id_checkbox_loop.checked;
  if (my.loop) {
    my.animLoop.start();
  }
}

function first_action() {
  ui_log('first_action');
  let index = 0;
  dbase_astro_update({ index });
}

function next_action() {
  ui_log('next_action');
  let index = (my.astro_index + 1) % my.nrefs;
  dbase_astro_update({ index });
}

function previous_action() {
  ui_log('previous_action');
  let index = (my.astro_index - 1 + my.nrefs) % my.nrefs;
  dbase_astro_update({ index });
}

function random_action() {
  ui_log('random_action');
  // my.astro_index = int(random(0, my.nrefs));
  // my.astro_index = Math.floor(Math.random() * my.nrefs);
  let index = Math.floor(Math.random() * my.nrefs);
  dbase_astro_update({ index });
}

function play_step_changed(newValue) {
  my.play_step_flag = newValue;
  let play_step = my.play_step_flag ? 1 : 0;
  dbase_astro_update({ play_step });
}

function show_qrcode_changed(newValue) {
  my.show_qrcode_flag = newValue;
  let show_qrcode = my.show_qrcode_flag ? 1 : 0;
  dbase_astro_update({ show_qrcode });
}
