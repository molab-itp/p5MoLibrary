function setup_animationFrame() {
  window.requestAnimationFrame(animationFrame_callback);
}

function animationFrame_callback(timeStamp) {
  // console.log('step_animation timeStamp', timeStamp);
  window.requestAnimationFrame(animationFrame_callback);
  if (my.video_play_index_pending && player_ready()) {
    let index = my.video_play_index_pending;
    my.video_play_index_pending = null;
    video_play_index(index);
    return;
  }
  let timeSecs = timeStamp / 1000;
  if (my.blackfacts_player_inited) {
    record_startup_time(timeSecs);
  } else {
    // Check for player setup stall
    // !!@ my. candidate
    if (timeSecs > 5.0) {
      console.log('animationFrame_callback player startup stall');
      player_startup_stalled();
    }
  }
  if (!my.isPortraitView && !params.qrcode) {
    if (my.blackfacts_qrcode) qrcode_show();
    else qrcode_hide();
  }
  if (my.animLoop) {
    my.animLoop.step({ action: stepAction, loop: my.playClip });
    let lapse = '';
    if (my.playClip) lapse = my.animLoop.lapse() + ' ' + my.stepCount;
    id_lapse_report.innerHTML = lapse;
  }
  if (!my.blackfacts_player_inited) {
    let str = 'Waiting for video ' + timeSecs.toFixed(2);
    if (my.stalled_report) {
      str += ' reload pending';
    }
    id_blackfacts_num.innerHTML = str;
    id_message_text.innerHTML = str;
  } else if (params.title) {
    let str = params.title;
    id_blackfacts_num.innerHTML = str;
    id_message_text.innerHTML = str;
  }
}

function record_startup_time(timeSecs) {
  if (!my.blackfacts_player_startup_time) {
    console.log('record_startup_time timeSecs', timeSecs);
    my.blackfacts_player_startup_time = timeSecs;
    dstore_blackfacts_update({}, { startup_time: timeSecs });
  }
}

// if the video player does not startup within a few seconds
// we log a startup stall and reload the page
// hoping for player to start
//
function player_startup_stalled() {
  if (my.stalled_report) {
    return;
  }
  my.stalled_report = 1;

  let { increment } = fb_.fbase;
  dstore_blackfacts_update({}, { startup_stall: increment(1) });

  setTimeout(function () {
    window.location.reload();
  }, 5.0 * 1000); // !!@ my. candidate
}
