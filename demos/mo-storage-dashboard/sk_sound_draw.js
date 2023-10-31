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
  let yline = height;
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
    // Skip of 0 index to avoid startup zero amplitude
    if (val < nowMin && i > 0) {
      nowMin = val;
      xline = i;
      yline = y;
    }
  }
  my.lastMax = nowMax;
  endShape();
  if (my.volhistory.length > width) {
    my.volhistory.splice(0, 1);
  }
  stroke(255, 255, 0);
  line(0, yline, width, yline);
  line(xline, yline, xline, height);
}
