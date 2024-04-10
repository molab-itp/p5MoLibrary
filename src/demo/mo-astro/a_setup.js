//
function a_setup() {
  //
  my.version = '?v=73';
  my.canvas = createCanvas(windowWidth, windowHeight - 90);
  // my.canvas.mousePressed(canvas_mousePressed);
  // my.canvas.mouseReleased(canvas_mouseReleased);
  my.width = width;
  my.height = height;
  my.paneRatio0 = 4 / 16;
  my.paneRatio1 = 12 / 16;
  my.paneRatio2 = 2 / 16;
  my.scanFlag = 1;

  my.isPortrait = height > width;
  // my.isRemote = window.innerHeight > window.innerWidth;

  my.refBox = new RefBox(refBox_init);
  my.nrefs = my.refBox.refs.length;

  create_pane0();

  create_pane1();

  create_pane2();

  my.pane = my.pane1;

  ui_init();

  focusAction();

  my.cycleCount = 1;
}

// pane for text info details
function create_pane0() {
  let fwidth = my.width;
  let height = my.height;
  let backgImg = my.backgImg;
  let x0 = 0;
  let y0 = 0;
  let z0 = 8;
  let width = floor(fwidth * my.paneRatio0);
  let refBox = my.refBox;
  if (my.isPortrait) {
    // width = floor(my.width * (3 / 9));
    width = my.width;
    height = floor(my.height * (6 / 16));
    // y0 = my.height - height;
  }
  let regionIndex = 0;
  my.pane0 = new Pane({ backgImg, x0, y0, z0, width, height, refBox, regionIndex });
}

// pane for astro image
function create_pane1() {
  let fwidth = my.width;
  let height = my.height;
  let backgImg = my.backgImg;
  let x0 = floor(fwidth * my.paneRatio0);
  let y0 = 0;
  let z0 = 4.5;
  let initCentered = 1;
  let width = floor(fwidth * my.paneRatio1);
  let refBox = my.refBox;
  if (my.isPortrait) {
    width = my.width;
    x0 = 0;
  }
  let regionIndex = 1;
  my.pane1 = new Pane({ backgImg, x0, y0, z0, width, height, initCentered, refBox, regionIndex });
}

// pane for qr code
function create_pane2() {
  let backgImg = my.qrcodeImg;
  let width = floor(my.width * my.paneRatio2);
  let height = width;
  let x0 = floor(my.width * (1 - my.paneRatio2));
  let y0 = my.height - height;
  let z0 = 1;
  my.pane2 = new Pane({ backgImg, x0, y0, z0, width, height });
}
