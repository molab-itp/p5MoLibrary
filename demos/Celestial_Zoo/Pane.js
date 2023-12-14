//

class Pane {
  // { backgImg, x0, y0, z0, width, height, initCentered, refBox, ptsIndex }
  constructor(props) {
    //
    Object.assign(this, props);

    // console.log('Pane', this.label, 'width', this.width, 'height', this.height);

    this.pan_init();

    if (this.initCentered) {
      this.pan_center();
    }

    this.fRect_init();
  }

  render() {
    this.render_backgImg();
    this.focus_fRect();
    this.fRect.render();
  }

  fRect_init() {
    //
    let x0 = 0;
    let y0 = 0;
    let width = 0;
    let height = 0;
    let stroke = color(234, 171, 126); // color('yellow');
    let strokeWeight = 2;
    let shadowBlur = 15;
    let shadowColor = color(234, 171, 126); // color('white');

    this.fRect = new Rect({ x0, y0, width, height, stroke, strokeWeight, shadowBlur, shadowColor });
  }

  render_backgImg() {
    let cm = this.canvasMap();
    let backgImg = this.backgImg;
    // zoom background image to the full width of the canvas
    let dx = this.x0;
    let dy = this.y0;
    let sx = this.panX;
    let sy = this.panY;
    image(backgImg, dx, dy, cm.dWidth, cm.dHeight, sx, sy, cm.sWidth, cm.sHeight);
  }

  refEntry() {
    return this.refBox.refEntry();
  }

  get label() {
    return 'pane' + this.ptsIndex;
  }

  pt() {
    let ent = this.refEntry();
    let pt = ent.pts[this.ptsIndex];
    // console.log(this.label, 'pt', JSON.stringify(pt));
    return pt;
  }

  focus() {
    this.focus_pan();
    this.focus_fRect();
  }

  focus_pan() {
    let pt = this.pt();
    this.zoomIndex = pt.z;
    this.zoomRatio = 1 / this.zoomIndex;
    let cm = this.canvasMap();
    // console.log('focus cm', JSON.stringify(cm));
    // let x = pt.x + pt.w * 0.5 - cm.sWidth * 0.5;
    // let y = pt.y + pt.h * 0.5 - cm.sHeight * 0.5;
    // this.panX = floor(x);
    // this.panY = floor(y);
    this.panX = floor(pt.x + (pt.w - cm.sWidth) * 0.5);
    this.panY = floor(pt.y + (pt.h - cm.sHeight) * 0.5);
    // console.log('focus pt', JSON.stringify(pt));
  }

  focus_fRect() {
    let pt = this.pt();
    let spt = this.ptToCanvas(pt);
    this.fRect.x0 = spt.x;
    this.fRect.y0 = spt.y;
    this.fRect.width = spt.w;
    this.fRect.height = spt.h;
  }

  touchPoint(x, y) {
    let xhit = this.x0 < x && x < this.x0 + this.width;
    let yhit = this.y0 < y && y < this.y0 + this.height;
    return xhit && yhit;
  }

  pan_updateZoom(newValue) {
    let oRatio = this.zoomRatio;
    this.zoomIndex = newValue;
    this.zoomRatio = 1 / this.zoomIndex;

    let ww = this.backgImg.width;
    let hh = this.backgImg.height;

    let oW = floor(ww * oRatio * 0.5);
    let oH = floor(hh * oRatio * 0.5);

    let nW = floor(ww * this.zoomRatio * 0.5);
    let nH = floor(hh * this.zoomRatio * 0.5);

    this.panX = this.panX + oW - nW;
    this.panY = this.panY + oH - nH;
  }

  pan_init() {
    this.panX = 0;
    this.panY = 0;
    this.zoomIndex = this.z0;
    this.zoomRatio = 1 / this.zoomIndex;
  }

  pan_center() {
    this.zoomIndex = this.z0;
    this.zoomRatio = 1 / this.zoomIndex;

    let cm = this.canvasMap();

    this.panX = floor((cm.ww - cm.sWidth) * 0.5);
    this.panY = floor((cm.hh - cm.sHeight) * 0.5);
  }

  // { dWidth, dHeight, sWidth, sHeight, ww, hh };
  canvasMap() {
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

  updateRefEntry(lastMouseEnts) {
    let ent = this.refEntry();

    if (lastMouseEnts.length >= 2) {
      this.updateEnt(ent, lastMouseEnts);
    } else {
      ent.pts[this.ptsIndex].z = this.zoomIndex;
    }

    this.refBox.save_localStorage();
  }

  ptToCanvas(pt) {
    // map from screen to image coordinates

    let cm = this.canvasMap();
    let wr = cm.dWidth / cm.sWidth;
    let hr = cm.dHeight / cm.sHeight;

    // let x = floor((ment.x - this.x0) * rw) + this.panX;
    // let y = floor((ment.y - this.y0) * rh) + this.panY;

    let x = floor((pt.x - this.panX) * wr + this.x0);
    let y = floor((pt.y - this.panY) * hr + this.y0);
    let w = floor(pt.w * wr);
    let h = floor(pt.h * hr);

    return { x, y, w, h };
  }

  updateEnt(ent, lastMouseEnts) {
    // map from  image to screen coordinates

    let cm = this.canvasMap();
    let rw = cm.sWidth / cm.dWidth;
    let rh = cm.sHeight / cm.dHeight;

    let pts = [];
    for (let ment of lastMouseEnts) {
      let x = floor((ment.x - this.x0) * rw) + this.panX;
      let y = floor((ment.y - this.y0) * rh) + this.panY;
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
    let x = pts[0].x;
    let y = pts[0].y;
    let w = pts[1].x - x;
    let h = pts[1].y - y;
    let z = this.zoomIndex;
    ent.pts[this.ptsIndex] = { x, y, w, h, z };
  }
}
