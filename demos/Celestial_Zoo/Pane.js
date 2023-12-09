//

class Pane {
  // { label, backgImg, x, y, width, height, initZoom, initCentered }
  constructor(props) {
    //
    Object.assign(this, props);
    this.initZoom = this.z;

    // console.log('Pane', this.label, 'width', this.width, 'height', this.height);
    //
    this.refBox = {
      //
      width: this.backgImg.width,
      height: this.backgImg.height,
      refs: [],
    };
    this.refIndex = 0;
    // this.refLabel = '';

    this.pan_init();

    if (this.initCentered) {
      this.pan_center();
    }
  }

  touchPoint(x, y) {
    let xhit = this.x < x && x < this.x + this.width;
    let yhit = this.y < y && y < this.y + this.height;
    // console.log('Pane', this.label, this.x, this.y);
    // console.log('x', x, 'y', y, 'xhit', xhit, 'yhit', yhit);
    return xhit && yhit;
  }

  pan_updateZoom(newValue) {
    let oRatio = this.zoomRatio;
    this.zoomIndex = newValue;
    this.zoomRatio = 1 / this.zoomIndex;

    let w = this.backgImg.width;
    let h = this.backgImg.height;

    let oW = floor(w * oRatio * 0.5);
    let oH = floor(h * oRatio * 0.5);

    let nW = floor(w * this.zoomRatio * 0.5);
    let nH = floor(h * this.zoomRatio * 0.5);

    this.panX = this.panX + oW - nW;
    this.panY = this.panY + oH - nH;
  }

  pan_init() {
    this.panX = 0;
    this.panY = 0;
    this.zoomIndex = this.initZoom;
    this.zoomRatio = 1 / this.zoomIndex;
  }

  pan_center() {
    this.zoomIndex = this.initZoom;
    this.zoomRatio = 1 / this.zoomIndex;

    let cm = this.coordMap();

    this.panX = floor((cm.ww - cm.sWidth) * 0.5);
    this.panY = floor((cm.hh - cm.sHeight) * 0.5);
  }

  // { dWidth, dHeight, sWidth, sHeight, ww, hh };
  coordMap() {
    let backgImg = this.backgImg;
    let ww = backgImg.width;
    let hh = backgImg.height;
    let rr = hh / ww;

    let dWidth = this.width;
    let dHeight = floor(dWidth * rr);
    if (dHeight < this.height) {
      dHeight = this.height;
      dWidth = floor(dHeight / rr);
    }

    let sWidth = floor(ww * this.zoomRatio);
    let sHeight = floor(hh * this.zoomRatio);
    if (this.width < dWidth) {
      let dr = this.width / dWidth;
      dWidth = this.width;
      sWidth = floor(sWidth * dr);
    }

    return { dWidth, dHeight, sWidth, sHeight, ww, hh };
  }

  draw_backgImg() {
    let cm = this.coordMap();

    let backgImg = this.backgImg;
    // zoom background image to the full width of the canvas

    let dx = this.x;
    let dy = this.y;

    let sx = this.panX;
    let sy = this.panY;

    image(backgImg, dx, dy, cm.dWidth, cm.dHeight, sx, sy, cm.sWidth, cm.sHeight);
  }

  mousePressed() {
    // console.log('Pane mousePressed', this.label);
    this.panX0 = mouseX;
    this.panY0 = mouseY;
  }

  mouseDragged() {
    this.panX += this.panX0 - mouseX;
    this.panY += this.panY0 - mouseY;
    this.panX0 = mouseX;
    this.panY0 = mouseY;
  }

  mouseReleased() {
    // console.log('Pane mouseReleased', this.label);
  }

  refEntry() {
    let ent = this.refBox.refs[this.refIndex];
    if (!ent) {
      ent = { label: '' };
      this.refBox.refs[this.refIndex] = ent;
    }
    return ent;
  }
  get refLabel() {
    let ent = this.refEntry();
    return ent.label;
  }

  set refLabel(label) {
    let ent = this.refEntry();
    ent.label = label;
  }

  // this.refBox.refs = [];
  //  { label: 'xx', pts: [[x,y,z], [x,y,z]] }
  // this.refIndex = 0;
  // this.refLabel = '';
  // this.zoomIndex = newValue;
  //
  updateRefEntry(lastMouseEnts) {
    if (lastMouseEnts.length < 2) return;

    let ent = this.refEntry();

    let dx = this.x;
    let dy = this.y;

    let sx = this.panX;
    let sy = this.panY;

    let cm = this.coordMap();
    let rw = cm.sWidth / cm.dWidth;
    let rh = cm.sHeight / cm.dHeight;
    // console.log('rw', rw, 'rh', rh);

    let pts = [];
    for (let ment of lastMouseEnts) {
      let x = floor((ment.x - dx) * rw) + sx;
      let y = floor((ment.y - dy) * rh) + sy;
      pts.push({ x, y });
    }
    if (pts[0].x > pts[1].x) {
      let temp = pts[1].x;
      pts[1].x = pts[0].x;
      pts[0].x = temp;
    }
    if (pts[0].y > pts[1].y) {
      let temp = pts[1].y;
      pts[1].y = pts[0].y;
      pts[0].y = temp;
    }
    {
      let x = pts[0].x;
      let y = pts[0].y;
      let w = pts[1].x - x;
      let h = pts[1].y - y;
      let z = this.zoomIndex;
      ent.pt = { x, y, w, h, z };
    }
  }
}
