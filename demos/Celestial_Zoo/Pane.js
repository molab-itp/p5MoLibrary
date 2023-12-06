//

class Pane {
  // { backgImg, width, height }
  constructor(props) {
    //
    Object.assign(this, props);
    //
    this.pan_init();
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
    this.zoomIndex = 8;
    this.zoomRatio = 1 / this.zoomIndex;
  }

  pan_center() {
    this.zoomIndex = 8;
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

    let dx = 0;
    let dy = 0;
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
