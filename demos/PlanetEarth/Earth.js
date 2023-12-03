class Earth {
  // {x, y, width, height, earthImg}
  constructor(props) {
    //
    Object.assign(this, props);
    //
    this.angleX = 0;
    this.angleXstep = 0.001;
    this.angleXdir = 1;
    //
    this.angleY = 2.8; // Africa
    // this.angleY = 5.0; // North America
    this.angleYstep = 0.001;
    this.angleYdir = 0;

    this.detailX = 24 * 4;
    this.detailY = 16 * 4;

    this.aRadius = floor(height * 0.38);

    const skt = (aInst) => {
      aInst.setup = () => {
        let w = this.width;
        let h = this.height;
        this.aCanvas = aInst.createCanvas(h, h, WEBGL);
        // this.aCanvas.position(w / 2 - h / 2, 0);
        // this.aCanvas.position(w - h, 0);
        this.aCanvas.position(this.x, this.y);
        aInst.clear();
        aInst.noStroke();
      };
      aInst.draw = () => {
        // aInst.orbitControl();

        aInst.rotateX(this.angleX);
        aInst.rotateY(this.angleY);

        this.angleX += this.angleXstep * this.angleXdir;
        this.angleY += this.angleYstep * this.angleYdir;

        aInst.lights();
        aInst.texture(this.earthImg);
        aInst.sphere(this.aRadius, this.detailX, this.detailY);
      };
    };
    this.pInst = new p5(skt);
  } // constructor

  setDir(newDir) {
    this.angleXdir = newDir[0];
    this.angleYdir = newDir[1];
  }
}
