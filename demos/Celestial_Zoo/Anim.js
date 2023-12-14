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
    this.started = 0;
  }

  // target
  // tragetProps { panX, panY, zoomIndex, zoomRatio  }
  //   initValues
  //   endValues
  //     start + (end - start) * perCent
  // startTime

  // Establish starting values for tragetProps
  // and start time for animation
  initValues() {
    let values = {};
    this.changes = [];
    for (let prop in this.targetProps) {
      let val = this.target[prop];
      values[prop] = val;
    }
    this.changes.push({ values });
    //
    this.startTime = Date.now();
    this.running = 1;
    this.changeIndex = 0;
  }

  // Establish ending values for tragetProps
  addChange(duration) {
    let values = {};
    for (let prop in this.targetProps) {
      values[prop] = this.target[prop];
    }
    duration *= 1000;
    this.changes.push({ duration, values });
  }

  // Update targetProps in target object for given duration
  stepValues() {
    let last = this.changes[this.changeIndex];
    let next = this.changes[this.changeIndex + 1];
    if (!this.running) {
      return;
    }
    let duration = next.duration;
    let perCent = (Date.now() - this.startTime) / duration;
    if (perCent > 1.0) {
      perCent = 1.0;
      this.changeIndex++;
      this.startTime = Date.now();
      if (this.changeIndex >= this.changes.length - 1) {
        this.running = 0;
      }
    }
    // console.log('perCent', perCent);
    let lastValues = last.values;
    let nextValues = next.values;
    for (let prop in this.targetProps) {
      let start = lastValues[prop];
      let end = nextValues[prop];
      let val = start + (end - start) * perCent;
      // console.log('prop', prop, 'start', start, 'end', end, 'val', val);
      this.target[prop] = val;
    }
  }

  // Update targetProps to the ending values and mark animation as done
  finish() {
    for (let prop in this.targetProps) {
      this.target[prop] = this._endValues[prop];
    }
    this.running = 0;
  }
}
