//

DrawPoints.prototype.draw_fourier = function () {
  // console.log('draw_fourier');
  if (!this.df) {
    this.df = {};
    this.df.width = this.width;
    this.df.height = this.height;
    fourier_init(this.df);
  }
  fourier_draw(this.df, this.drawings);
};

function fourier_draw(df, drawings) {
  // console.log('fourier_prepare');
  if (my.updateCount != df.updateCount) {
    df.updateCount = my.updateCount;
    df.fourierX = null;
    df.findex = 0;
    let fdrawings = drawings.map((points) => {
      return points.map((point) => {
        let x = point.x - df.centerX;
        let y = point.y - df.centerY;
        return { x, y };
      });
    });
    df.fdrawings = fdrawings;
  }
  if (!df.fourierX) {
    let points = df.fdrawings[df.findex];
    fourier_XY(df, points);
  }

  df.output.clear();
  fourier_drawPaths(df);
}

function next_drawing(df) {
  console.log('next_drawing df.time', df.time, 'df.findex', df.findex, frameCount);
  df.time = 0;
  df.path = [];
  df.findex = (df.findex + 1) % df.fdrawings.length;
  df.fourierX = null;
  if (df.findex == 0) {
    draw_cycle_init();
  }
}

function draw_cycle_init() {
  let drawPoints = my.drawPoints;
  console.log('draw_cycle_init pointIndex', my.drawPoints.pointIndex, 'cycleCompleted', drawPoints.cycleCompleted);
  if (drawPoints.cycleCompleted) {
    drawPoints.cycleCompleted = 0;
    drawPoints.pointIndex = 0;
  }
  // my.drawPoints.pointIndex = 0;
}

function fourier_init(df) {
  // df.width
  // df.height
  // df.fdrawings = [ [ {x,y}...], ... ]
  df.findex = 0; // 0 ... fdrawings.length-1
  df.updateCount = -1;
  df.output = createGraphics(df.width, df.height);
  df.centerX = df.width / 2;
  df.centerY = df.height / 2;
  // df.fourierX;
  // df.fourierY;
  df.time = 0;
  df.path = [];
  df.drawing = [];
  df.state = -1;
  df.trackColor = 0;
  df.drawColor = 0;
  df.epiWeight = 1;
  df.vxyColor = 0; // 'gold';
  df.epiLineColor = 0; // 'green';
  df.epiCircleColor = [10, 10, 10, 100];
  df.drawWeight = 2;
  // df.deltaFt;
  // df.centerX;
  // df.centerY;
  df.run = 1;
  df.step = 0;
  df.drawCenter = 0;
}

function fourier_drawPaths(df) {
  let x1 = df.centerX;
  let y1 = df.height / 8;
  let x2 = df.width / 8;
  let y2 = df.centerY;
  if (df.drawCenter) {
    x1 = df.centerX;
    y1 = df.centerY;
    x2 = df.centerX;
    y2 = df.centerY;
  }
  let vx = epiCycles(df, x1, y1, 0, df.fourierX);
  let vy = epiCycles(df, x2, y2, HALF_PI, df.fourierY);
  let v = { x: vx.x, y: vy.y };

  if (df.run || df.step) {
    // add element to the beginning of array
    df.path.unshift(v);
  }
  let layer = df.output;

  layer.strokeWeight(df.epiWeight);
  layer.stroke(df.vxyColor);
  layer.line(vx.x, vx.y, v.x, v.y);
  layer.line(vy.x, vy.y, v.x, v.y);

  layer.strokeWeight(df.drawWeight);
  layer.stroke(df.drawColor);
  layer.beginShape();
  layer.noFill();
  for (let elm of df.path) {
    layer.vertex(elm.x, elm.y);
  }
  layer.endShape();

  if (df.run || df.step) {
    df.time += df.deltaFt;
    if (df.time >= TWO_PI) {
      next_drawing(df);
    }
  }
  df.step = 0;
}

// draw epi cycles
// return last point at time df.time
// var time is used to determine x, y
//
function epiCycles(df, x, y, rotation, points) {
  let layer = df.output;
  // parameters x and y modified in this loop
  for (let elm of points) {
    let prevx = x;
    let prevy = y;
    let freq = elm.freq;
    let radius = elm.amp;
    let phase = elm.phase;
    x += radius * cos(freq * df.time + phase + rotation);
    y += radius * sin(freq * df.time + phase + rotation);
    layer.strokeWeight(df.epiWeight);
    layer.stroke(df.epiCircleColor);
    layer.noFill();
    layer.ellipse(prevx, prevy, radius * 2);
    layer.stroke(df.epiLineColor);
    layer.line(prevx, prevy, x, y);
  }
  return { x, y };
}
