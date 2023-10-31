let volhistory = [];
let lastMax = 0;

function sound_draw() {
  let vol;
  if (my.mic) {
    vol = my.mic.getLevel();
  } else if (my.amp) {
    vol = my.amp.getLevel();
  } else {
    return;
  }
  // console.log('sound_draw vol', vol);
  volhistory.push(vol);
  strokeWeight(2);
  stroke(255);
  noFill();
  beginShape();
  let nowMax = 0;
  let nowMin = 1;
  let xline = frameCount % width;
  for (let i = 0; i < volhistory.length; i++) {
    let val = volhistory[i];
    let y = map(val, 0, lastMax, height, 0);
    vertex(i, y);
    if (val > lastMax) {
      lastMax = val;
    }
    if (val > nowMax) {
      nowMax = val;
    }
    if (val < nowMin) {
      nowMin = val;
      xline = i;
    }
  }
  lastMax = nowMax;
  endShape();
  if (volhistory.length > width) {
    volhistory.splice(0, 1);
  }
  stroke(255, 0, 0);
  line(xline, 0, xline, height);
}
