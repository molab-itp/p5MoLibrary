//

class Planet {
  // {x, y, width, height, img, flushRight, orbitControl}
  constructor(props) {
    //
    Object.assign(this, props);
    //
    this.angleX = 0;
    this.angleXstep = 0.001;
    this.angleXdir = 1;
    //
    this.angleY = 2.8; // Africa
    this.angleYstep = 0.001;
    this.angleYdir = 0;

    this.angleZ = 0;
    this.angleZstep = 0.001;
    this.angleZdir = 0;

    this.detailX = 24 * 4;
    this.detailY = 16 * 4;

    this.aRadius = floor(this.height * 0.38);

    // Create an p5 instance to allow 3D to be layer on 2D canvas
    const Planet_sketch = (aInst) => {
      //
      aInst.setup = () => {
        //
        let w = this.width;
        let h = this.height;
        this.aCanvas = aInst.createCanvas(h, h, WEBGL);
        if (this.flushRight) {
          this.x = w - h;
        }
        this.aCanvas.position(this.x, this.y);
        aInst.clear();
        aInst.noStroke();
      };
      //
      aInst.draw = () => {
        //
        aInst.clear();

        if (this.orbitControl) {
          aInst.orbitControl();
        }

        aInst.rotateX(this.angleX);
        aInst.rotateY(this.angleY);
        aInst.rotateZ(this.angleZ);
        // Order of XY rotation matters
        // aInst.rotateX(this.angleX);

        this.angleX += this.angleXstep * this.angleXdir;
        this.angleY += this.angleYstep * this.angleYdir;
        this.angleZ += this.angleZstep * this.angleZdir;

        aInst.lights();
        aInst.texture(this.img);
        aInst.sphere(this.aRadius, this.detailX, this.detailY);
      };
    };

    this.pInst = new p5(Planet_sketch);
  } // constructor

  setDir(newDir) {
    this.angleXdir = newDir[0];
    this.angleYdir = newDir[1];
    this.angleZdir = newDir[2];
  }

  zero() {
    this.angleX = 0;
    this.angleY = 0;
    this.angleZ = 0;
  }

  setAngle(x, y, z) {
    this.angleX = x;
    this.angleY = y;
    this.angleZ = z;
  }
}
