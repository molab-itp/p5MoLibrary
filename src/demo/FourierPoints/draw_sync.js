//

DrawPoints.prototype.draw_sync = function () {
  let ncolors = this.draw_specs.length;
  let npoints = this.npoints;
  let stopIndex = this.pointIndex;
  this.maxPoints = npoints * ncolors;
  this.pointIndex = (this.pointIndex + 1) % this.maxPoints;
  if (this.pointIndex == 0) {
    console.log('draw_sync pointIndex', this.pointIndex, 'stopIndex', stopIndex, frameCount);
    this.cycleCompleted = 1;
  }
  let spec = this.draw_specs[0];
  let stepper = (ipoint) => {
    if (ipoint % npoints == 0) {
      let icycle = args.icycle;
      let spec = this.draw_specs[icycle];
      // let str = formatNumber(progress);
      // str = str + ' ipoint ' + ipoint + ' stopIndex ' + stopIndex + ' strokeWeight ' + istrokeWeight;
      // str += ' icycle ' + icycle + ' icolor ' + icolor;
      // console.log('draw_sync ipoint', ipoint, frameCount);
      this.output.stroke(spec.color);
      this.output.strokeWeight(spec.strokeWeight);
      args.icycle = (args.icycle + 1) % ncolors;
      // if (args.icycle == 0) {
      // console.log('draw_sync icycle', args.icycle, frameCount);
      // }
    }
  };
  let args = {
    color: spec.color,
    strokeWeight: spec.strokeWeight,
    stopIndex: stopIndex,
    xoffset: this.xoffset,
    stepper: stepper,
    icycle: 0,
  };
  this.draw_sync_to(args);
};

DrawPoints.prototype.draw_sync_to = function (args) {
  this.output.stroke(args.color);
  this.output.strokeWeight(args.strokeWeight);
  let stepper = args.stepper;
  let stopIndex = args.stopIndex;
  let xoffset = args.xoffset;
  let ipoint = 0;
  // console.log('draw_sync_to while1 icycle', args.icycle, frameCount);
  while (ipoint <= stopIndex) {
    // Draw all points up until stopIndex
    for (let points of this.drawings) {
      // console.log('draw_to ipoint', ipoint, 'stopIndex', stopIndex, frameCount);
      for (let i = 1; i < points.length; i++) {
        if (ipoint > stopIndex) break;
        if (stepper) stepper(ipoint);
        let prev = points[i - 1];
        let point = points[i];
        this.lineFrom(point, prev, xoffset);
        ipoint++;
      }
    }
    // detect no change
    if (!ipoint) {
      // console.log('stopIndex_draw No change ipoint', ipoint);
      break;
    }
    // console.log('draw_sync_to while2 icycle', args.icycle, frameCount);
  }
  // if (ipoint >= this.npoints) {
  //   console.log('draw_sync_to icycle', args.icycle, frameCount);
  // }
};
