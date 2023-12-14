//
class Anim {
  // { duration, target, tragetProps }
  //    eg: tragetProps: { panX:1, panY:1, zoomIndex:1, zoomRatio:1 }
  //
  constructor(props) {
    //
    Object.assign(this, props);
    this.duration *= 1000; // Convert to millisec
    this.running = 0;
  }

  // target
  // tragetProps { panX, panY, zoomIndex, zoomRatio  }
  //   startValues
  //   endValues
  //     start + (end - start) * perCent
  // startTime

  // Establish starting values for tragetProps
  // and start time for animation
  initValues() {
    this._startValues = {};
    this._endValues = {};
    for (let prop in this.targetProps) {
      let val = this.target[prop];
      this._startValues[prop] = val;
      this._endValues[prop] = val;
    }
    this.startTime = Date.now();
    this.running = 1;
  }

  // Establish ending values for tragetProps
  endValues() {
    for (let prop in this.targetProps) {
      this._endValues[prop] = this.target[prop];
      this.target[prop] = this._startValues[prop];
    }
  }

  // Update targetProps in target object for given duration
  stepValues() {
    if (!this.duration || !this.running) {
      return;
    }
    let perCent = (Date.now() - this.startTime) / this.duration;
    if (perCent > 1.0) perCent = 1.0;
    // console.log('perCent', perCent);
    for (let prop in this.targetProps) {
      let start = this._startValues[prop];
      let end = this._endValues[prop];
      let val = start + (end - start) * perCent;
      // console.log('start', start, 'end', end, 'val', val);
      this.target[prop] = val;
    }
    if (perCent >= 1.0) {
      this.running = 0;
    }
  }

  // Update targetProps to the ending values and mark animation as done
  finish() {
    for (let prop in this.targetProps) {
      let val = this._endValues[prop];
      this.target[prop] = val;
    }
    this.running = 0;
  }
}
