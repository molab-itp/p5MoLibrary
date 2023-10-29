function record_state_update(newState) {
  init_counts();
  my.record_preroll = newState;
  let now = millis() / 1000;
  my.recordCountDown.next_secs = now + my.recordCountDown.max;
  if (newState) {
    my.replay = 0;
    my.replayChk.checked(0);
  } else {
    my.recordCountDown.next_secs = 0;
  }
}

function record_state_track() {
  //
  let m = height / 20;
  strokeWeight(m);
  if (my.record && !my.record_preroll) {
    stroke(255, 0, 0);
    noFill();
    rect(0, 0, width, height);
  }
  if (!my.record_preroll) {
    return;
  }
  let now = millis() / 1000;
  if (now > my.recordCountDown.next_secs) {
    my.record_preroll = 0;
    return;
  }
  let cnt = my.recordCountDown.next_secs - now;
  cnt = int(cnt + 1);
  let str = cnt + '';
  let w = textSize(str);
  let h = width / 2;
  let x = width / 2 - w / 2;
  let y = height / 2;
  stroke(255, 0, 0);
  fill(255, 0, 0);
  textSize(h);
  text(cnt, x, y);
}
