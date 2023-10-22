function draw_millis(layer) {
  let fmt = { layer, right: 1, small: 1, frac: 2 };
  draw_number(millis() / 1000, fmt);
}

function draw_number(num, opt) {
  let { layer, right, small, frac } = opt;

  let capSize = my.topCaptionSize;
  if (small) capSize /= 3;
  layer.textSize(capSize);

  let str = num.toString();
  if (frac) {
    str = convert_timeFrac(num, frac);
  }
  str = str.padStart(my.image_seq_pad, '0');

  let tw = layer.textWidth(str);
  let th = layer.textLeading();
  let ta = layer.textAscent();

  let x = 0;
  let y = 0;
  if (right) {
    x = layer.width - tw;
    // y = layer.height - th;
  }
  let colr = my.colors[my.colorIndex];
  layer.fill(colr);
  layer.rect(x, y, tw, th);
  layer.fill(255);
  layer.text(str, x, y + ta);
}

function convert_timeFrac(num, frac) {
  let sec = int(num);
  let fsec = int((num - sec) * 100);
  let min = int(sec / 60);
  sec -= min * 60;
  let hours = int(min / 60);
  min -= hours * 60;
  // console.log('hours', hours, 'min', min, 'sec', sec, 'num', num);
  let str = '.' + fsec.toString().padStart(2, 0);
  if (sec != 0 || min != 0 || hours != 0) {
    str = sec.toString().padStart(2, '0') + str;
  }
  if (min != 0 || hours != 0) {
    str = min.toString().padStart(2, '0') + ':' + str;
  }
  if (hours != 0) {
    str = hours.toString().padStart(2, '0') + ':' + str;
  }
  return str;
}
