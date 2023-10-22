function draw_millis(layer) {
  let fmt = { layer, right: 1, small: 1, frac: 2 };
  draw_number(millis() / 1000, fmt);
}

function draw_number(num, opt) {
  let { layer, right, small, frac } = opt;

  layer.textSize(my.captionSize);

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
  } else {
    tw = layer.width / 2;
    str += ' ' + my.uid.substring(0, 7);
  }
  let colr = my.colors[my.colorIndex];
  if (right) colr = 0;
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

//  toISOString()

function draw_dateISOString(layer) {
  let today = new Date();
  let str = today.toISOString();

  let capSize = my.captionSize;
  layer.textSize(capSize);

  let tw = layer.textWidth(str);
  let th = layer.textLeading();
  let ta = layer.textAscent();

  let x = layer.width - tw;
  let y = layer.height - th;

  // let colr = my.colors[my.colorIndex];
  layer.fill(0);
  layer.rect(x, y, tw, th);
  layer.fill(255);
  layer.text(str, x, y + ta);
}
