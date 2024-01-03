//

let dirRight = [0, 1, 0];
let dirLeft = [0, -1, 0];
let dirUp = [1, 0, 0];
let dirDown = [-1, 0, 0];
let dirStop = [0, 0, 0];
let dirZRight = [0, 0, 1];
let dirZLeft = [0, 0, -1];
let uuScale = 0.3;

function make_earth() {
  let img = my.earthImg;
  let uu = floor(my.height * uuScale);
  let x = my.width - uu;
  let y = 0;
  let width = uu;
  let height = uu;
  let orbitControl = 1;
  my.earth = new HeavenlyBody({ x, y, width, height, img, orbitControl });
  my.earth.label = 'earth';
  my.earth.setDir(dirRight);
}

function make_moon() {
  let img = my.moonImg;
  let uu = floor(my.height * uuScale);
  let x = 0;
  let y = 0;
  let width = uu;
  let height = uu;
  let orbitControl = 1;
  my.body2 = new HeavenlyBody({ x, y, width, height, img, orbitControl });
  my.body2.label = 'moon';
  my.body2.setDir(dirStop);
}

function make_camBody() {
  my.capture = createCapture(VIDEO);
  my.capture.hide();
  let uu = floor(my.height * uuScale);
  // center on x
  let x = floor((my.width - uu) * 0.5);
  let y = 0;
  let img = null;
  let width = uu;
  let height = uu;
  let orbitControl = 1;
  let capture = my.capture;
  my.camBody = new HeavenlyBody({ x, y, width, height, img, orbitControl, capture });
  my.camBody.label = 'camBody';
  my.camBody.setDir(dirStop);
  // Spiral from top of camera
  my.camBody.setAngle(-1.5, 3.0, 0);
}
