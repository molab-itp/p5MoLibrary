//
// Create an p5 instance to allow 3D to be layer on 2D canvas

class HeavenlyBody {
  // {x, y, width, height, img, orbitControl, capture, label, step}
  constructor(props) {
    Object.assign(this, props);

    if (!this.step) this.step = 0.002;

    this.angleX = 0;
    this.angleXstep = this.step; // 0.001;
    this.angleXdir = 1;

    this.angleY = 2.8; // Africa
    this.angleYstep = this.step;
    this.angleYdir = 0;

    this.angleZ = 0;
    this.angleZstep = this.step;
    this.angleZdir = 0;

    this.detailX = 24 * 4;
    this.detailY = 16 * 4;

    this.aRadius = floor(this.height * 0.47);

    // Create an p5 instance to allow 3D to be layer on 2D canvas
    const HeavenlyBody_sketch = (aInst) => {
      //
      aInst.setup = () => {
        //
        this.p5_setup(aInst);
      };
      //
      aInst.draw = () => {
        //
        this.p5_draw(aInst);
      };
    };

    this.pInst = new p5(HeavenlyBody_sketch);
  } // constructor

  p5_setup(aInst) {
    //
    let w = this.width;
    let h = this.height;
    this.aCanvas = aInst.createCanvas(w, h, WEBGL);
    this.aCanvas.position(this.x, this.y);
    aInst.clear();
    aInst.noStroke();
  }

  p5_draw(aInst) {
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
    if (this.img) {
      aInst.texture(this.img);
    } else if (this.capture) {
      aInst.texture(this.capture);
    }
    aInst.sphere(this.aRadius, this.detailX, this.detailY);
  }

  setDir(newDir) {
    console.log(this.label, 'setDir', newDir);
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

  pointInside(x, y) {
    let inX = x >= this.x && x <= this.x + this.width;
    let inY = y >= this.y && y <= this.y + this.height;
    // console.log(this.label, 'x y', x, y, inX, inY);
    return inX & inY;
  }
}

// https://p5js.org/reference/#/p5/p5

// https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
