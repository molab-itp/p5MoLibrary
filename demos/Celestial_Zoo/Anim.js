//
class Anim {
  // { target, loop, duration, action }
  //    eg: values: { panX:1, panY:1, zoomIndex:1, zoomRatio:1 }
  //
  constructor(props) {
    //
    Object.assign(this, props);
    // convert duration from seconds to milliseconds
    this.duration *= 1000;
    this.running = 0;
    this.started = 0;
  }

  start() {
    this.startTime = Date.now();
    this.running = 1;
  }

  step() {
    let now = Date.now();
    let lapse = now - this.startTime;
    if (lapse > this.duration) {
      this.startTime = now;
      this.running = this.loop;
      if (this.action) {
        this.action();
      }
    }
  }

  // target
  // values { panX, panY, zoomIndex, zoomRatio  }
  //   initValues
  //   endValues
  //     start + (end - start) * perCent
  // startTime

  // Establish starting values
  initValues(values) {
    this.changes = [];
    this.changes.push({ values });
    this.startTime = Date.now();
    this.running = 1;
    this.changeIndex = 0;
  }

  // Establish ending values for values
  addChange(duration, values) {
    // convert duration from seconds to milliseconds
    duration *= 1000;
    this.changes.push({ duration, values });
    // console.log('addChange changes n', this.changes.length, 'running', this.running);
  }

  // Update targetProps in target object for given duration
  stepValues() {
    if (!this.running) {
      // console.log('stepValues return changeIndex', this.changeIndex, 'running', this.running);
      return;
    }
    let last = this.changes[this.changeIndex];
    let next = this.changes[this.changeIndex + 1];
    let lastValues = last.values;
    let nextValues = next.values;
    let duration = next.duration;
    if (duration <= 0) {
      for (let prop in nextValues) {
        this.target[prop] = nextValues[prop];
      }
      this.nextChange();
      return;
    }
    let perCent = (Date.now() - this.startTime) / duration;
    if (perCent >= 1.0) {
      perCent = 1.0;
      this.nextChange();
    }
    // console.log('perCent', perCent);
    for (let prop in nextValues) {
      let last = lastValues[prop];
      let next = nextValues[prop];
      if (last == undefined) {
        // console.log(this.target.ptsIndex, 'changeIndex', this.changeIndex, 'continue prop', prop, 'last', last);
        this.target[prop] = next;
        continue;
      }
      let val = last + (next - last) * perCent;
      // console.log('prop', prop, 'last', last, 'next', next, 'val', val);
      this.target[prop] = val;
    }
  }

  nextChange() {
    this.changeIndex++;
    this.startTime = Date.now();
    if (this.changeIndex >= this.changes.length - 1) {
      this.running = 0;
    }
    // console.log(this.target.ptsIndex, 'stepValues changeIndex', this.changeIndex, 'running', this.running);
  }

  // Update targetProps to the ending values and mark animation as done
  finish() {
    for (let prop in this.targetProps) {
      this.target[prop] = this._endValues[prop];
    }
    this.running = 0;
    console.log('finish changeIndex', this.changeIndex, 'running', this.running);
  }
}
