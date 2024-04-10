function setup_animationFrame() {
  window.requestAnimationFrame(animationFrame_callback);
}

function animationFrame_callback(timeStamp) {
  // console.log('step_animation timeStamp', timeStamp);
  window.requestAnimationFrame(animationFrame_callback);
  if (my.video_play_index_pending && player_ready()) {
    let index = my.video_play_index_pending;
    my.video_play_index_pending = null;
    video_play_index(index, my.echo_delay);
    return;
  }
  let timeSecs = timeStamp / 1000;
  if (my.blackfacts_player_inited) {
    record_startup_time(timeSecs);
  } else {
    // Check for player setup stall
    // !!@ my. candidate value 5.0)
    if (timeSecs > 5.0) {
      console.log('animationFrame_callback player startup stall');
      player_startup_stalled();
    }
  }
  // if (!my.isRemote && !params.qrcode) {
  // if (my.blackfacts_qrcode) qrcode_show();
  // else qrcode_hide();
  // }
  if (my.animLoop) {
    my.animLoop.step({ action: stepAction, loop: my.playClip });
    let lapse = '';
    if (my.playClip) lapse = my.animLoop.lapse() + ' ' + my.stepCount;
    id_lapse_report.innerHTML = lapse;
  }
  if (my.pingLoop) {
    my.pingLoop.step({ loop: 1 });
  }
  if (!my.blackfacts_player_inited) {
    let str = 'Waiting for video ' + timeSecs.toFixed(2);
    if (my.stalled_report) {
      str += ' reload pending';
    }
    show_message(str);
  } else {
    // my.blackfacts_player_inited
    if (params.title) {
      let str = params.title;
      show_message(str);
    }
    // Attempt to autoplay fails
    // appears that we need some user interaction for video to play
    //
    // if (my.video_cued_count && !my.video_played_count) {
    //   console.log('frame waiting for play');
    //   if (!my.video_play_issued) my.video_play_issued = 0;
    //   my.video_play_issued++;
    //   if (my.video_play_issued == 60) {
    //     console.log('frame playVideo');
    //     player.playVideo();
    //   }
    // }
    if (my.isRemote) {
      if (my.video_played_count != my.video_played_count_prior) {
        console.log('frame played_count change ', my.video_played_count, my.video_played_count_prior);
        my.video_played_count_prior = my.video_played_count;
        let time = player.getCurrentTime();
        dbase_update_item({ time });
        dbase_issue_actions({ play_video_action: 1 }, { group: my.group });
      }
    }
    if (
      !my.isRemote && //
      dbase_actions_issued(my.uid, { play_video_action: 1 }, { group: my.group })
    ) {
      console.log('frame dbase_actions_issued player.playVideo ', player_ready());
      if (player_ready()) {
        if (my.a_group_item) {
          let time = my.a_group_item.time;
          if (time != undefined) {
            console.log('frame dbase_actions_issued time ', time);
            player.seekTo(time);
          }
        }
        player.playVideo();
      }
    }
  }
}

function record_startup_time(timeSecs) {
  if (!my.blackfacts_player_startup_time) {
    // console.log('record_startup_time timeSecs', timeSecs);
    my.blackfacts_player_startup_time = timeSecs;
    dbase_update_props({ startup_time: timeSecs });
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

  let { increment } = fireb_.fbase;
  dbase_update_props({ startup_stall: increment(1) });

  setTimeout(function () {
    window.location.reload();
  }, 5.0 * 1000); // !!@ my. candidate
}
