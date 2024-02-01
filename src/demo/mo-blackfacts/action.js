//

console.log('BlackFacts action.js');

id_button_next.addEventListener('click', next_action);
id_button_previous.addEventListener('click', previous_action);
id_button_first.addEventListener('click', first_action);
id_button_random.addEventListener('click', random_action);
id_checkbox_play_next.addEventListener('click', play_next_action);
id_checkbox_play_clip.addEventListener('click', play_clip_action);
id_checkbox_qrcode.addEventListener('click', qrcode_action);
id_button_more.addEventListener('click', more_action);
id_button_nation_time.addEventListener('click', nation_time_action);

function nation_time_action() {
  let videoKey = '-UtKxghWlvY';
  playlist = [videoKey];
  execCommand();
}

function more_action() {
  id_index_button_container.classList.toggle('hidden');
  id_player.classList.toggle('hidden');
}

function qrcode_action() {
  ui_log(my, 'qrcode_action id_checkbox_qrcode.checked', id_checkbox_qrcode.checked);
  my.qrcodeFlag = id_checkbox_qrcode.checked;
  let qrcode = my.qrcodeFlag ? 1 : 0;
  dstore_blackfacts_update({ qrcode });
}

function play_clip_action() {
  ui_log(my, 'play_clip_action id_checkbox_play_clip.checked', id_checkbox_play_clip.checked);
  my.playClip = id_checkbox_play_clip.checked;
  if (my.playClip) {
    my.animLoop.start();
    next_action();
  }
}

function play_next_action() {
  ui_log(my, 'play_next_action id_checkbox_play_next.checked', id_checkbox_play_next.checked);
  my.playNext = id_checkbox_play_next.checked;
  if (my.playNext) {
    next_action();
  }
}

function first_action() {
  ui_log(my, 'first_action');
  let index = 0;
  dstore_blackfacts_update({ index });
}

function next_action() {
  ui_log(my, 'next_action');
  let index = (my.blackfacts_index + 1) % nfacts;
  dstore_blackfacts_update({ index });
}

function previous_action() {
  ui_log(my, 'previous_action');
  let index = (my.blackfacts_index - 1 + nfacts) % nfacts;
  dstore_blackfacts_update({ index });
}

function random_action() {
  ui_log(my, 'random_action');
  // my.blackfacts_index = int(random(0, nfacts));
  // my.blackfacts_index = Math.floor(Math.random() * nfacts);
  let index = Math.floor(Math.random() * nfacts);
  dstore_blackfacts_update({ index });
}

function stepAction() {
  console.log('stepAction ');
  next_action();
  my.stepCount++;
}

//
// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

// document.getElementById('example').innerHTML
// https://stackoverflow.com/questions/3434278/do-dom-tree-elements-with-ids-become-global-properties
// https://html.spec.whatwg.org/multipage/nav-history-apis.html#named-access-on-the-window-object
