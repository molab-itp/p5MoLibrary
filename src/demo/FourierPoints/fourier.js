//

// drawing = [ {x,y}, ... ]
// x, y relative to center of screen
// -> {
//    fourierX: [ num, ....]},
//    fourierY: [ num, ....]},
//    deltaFt: delta to circle
//
function fourier_XY(df, points) {
  if (!points) points = [];
  let xx = [];
  let yy = [];
  for (let elm of points) {
    xx.push(elm.x);
    yy.push(elm.y);
  }
  df.fourierX = dft(xx);
  df.fourierY = dft(yy);

  df.fourierX.sort((a, b) => b.amp - a.amp);
  df.fourierY.sort((a, b) => b.amp - a.amp);

  df.deltaFt = points.length ? TWO_PI / points.length : 0.0;
}

// x = [ r, ... ]
// --> X = [ { i=0..n, re, im, amp, phase } ]
//
function dft(x) {
  const X = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < N; n++) {
      const phi = (TWO_PI * k * n) / N;
      re += x[n] * cos(phi);
      im -= x[n] * sin(phi);
    }
    re = re / N;
    im = im / N;

    let freq = k;
    let amp = sqrt(re * re + im * im);
    let phase = atan2(im, re);
    X[k] = { re, im, freq, amp, phase };
  }
  return X;
}

// https://editor.p5js.org/jht9629-nyu/sketches/IVDUXSeJc
// Fourier and Epicycles -codingtrain

// https://thecodingtrain.com/challenges/125-fourier-series

// https://editor.p5js.org/codingtrain/sketches/jawHqwfda
// CC 130.2: Drawing with Fourier Transform and Epicycles
// https://thecodingtrain.com/challenges/130-drawing-with-fourier-transform-and-epicycles

// Coding Challenge 130: Drawing with Fourier Transform and Epicycles
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/130.2-fourier-transform-drawing.html
// https://youtu.be/n9nfTxp_APM
// https://editor.p5js.org/codingtrain/sketches/jawHqwfda
