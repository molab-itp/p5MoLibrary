function sound_draw_init() {
  my.volhistory = [];
  my.lastMax = 0;
}

function sound_draw() {
  let vol;
  if (!my.soundEnable) {
    return;
  }
  if (my.amp) {
    vol = my.amp.getLevel();
  } else if (my.mic) {
    vol = my.mic.getLevel();
  } else {
    return;
  }
  // console.log('sound_draw vol', vol);
  my.volhistory.push(vol);
  strokeWeight(2);
  stroke(255);
  noFill();
  beginShape();
  let nowMax = 0;
  let nowMin = 1;
  let xline = frameCount % width;
  for (let i = 0; i < my.volhistory.length; i++) {
    let val = my.volhistory[i];
    let y = map(val, 0, my.lastMax, height, 0);
    vertex(i, y);
    if (val > my.lastMax) {
      my.lastMax = val;
    }
    if (val > nowMax) {
      nowMax = val;
    }
    if (val < nowMin) {
      nowMin = val;
      xline = i;
    }
  }
  my.lastMax = nowMax;
  endShape();
  if (my.volhistory.length > width) {
    my.volhistory.splice(0, 1);
  }
  stroke(255, 0, 0);
  line(xline, 0, xline, height);
}
