//

class Pane {
  // { label, backgImg, x, y, width, height, initZoom, initCentered }
  constructor(props) {
    //
    Object.assign(this, props);
    this.initZoom = this.z;
    //
    console.log('Pane', this.label, 'width', this.width, 'height', this.height);
    //
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
    let w = this.backgImg.width;
    let h = this.backgImg.height;
    let sWidth = floor(w * this.zoomRatio);
    let sHeight = floor(h * this.zoomRatio);
    this.panX = floor((w - sWidth) * 0.5);
    this.panY = floor((h - sHeight) * 0.5);
    // !!@ Need to correct center for dHeight < this.height
  }

  draw_backgImg() {
    let backgImg = this.backgImg;
    // zoom background image to the full width of the canvas
    let w = backgImg.width;
    let h = backgImg.height;
    let r = h / w;

    let dx = this.x;
    let dy = this.y;
    let dWidth = this.width;
    let dHeight = floor(dWidth * r);
    if (dHeight < this.height) {
      dHeight = this.height;
      dWidth = floor(dHeight / r);
    }

    let sx = this.panX;
    let sy = this.panY;
    let sWidth = floor(w * this.zoomRatio);
    let sHeight = floor(h * this.zoomRatio);
    if (this.width < dWidth) {
      let dr = this.width / dWidth;
      dWidth = this.width;
      sWidth = floor(sWidth * dr);
    }

    image(backgImg, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);
  }

  mousePressed() {
    this.panX0 = mouseX;
    this.panY0 = mouseY;
  }

  mouseDragged() {
    this.panX += this.panX0 - mouseX;
    this.panY += this.panY0 - mouseY;
    this.panX0 = mouseX;
    this.panY0 = mouseY;
  }
}
