//
function my_setup() {
  //
  my.version = '?v=119';
  my.canvas = createCanvas(windowWidth, windowHeight - 90);
  my.canvas.mousePressed(canvas_mousePressed);
  my.canvas.mouseReleased(canvas_mouseReleased);
  my.width = width;
  my.height = height;
  my.paneRatio = 12 / 16;
  // my.isPortrait = height > width;
  my.isPortrait = 1;
  my.scanFlag = 0;

  my.refBox = new RefBox(refBox_init);

  create_pane0();

  create_pane1();

  my.pane = my.pane1;

  ui_init();

  focusAction();

  my.cycleCount = 1;
}

function create_pane0() {
  let backgImg = my.backgImg;
  let rr = 1 - my.paneRatio;
  let x0 = 0;
  let y0 = 0;
  let z0 = 1;
  let height = my.height * 0.25;
  let width = my.width;
  let refBox = my.refBox;
  // if (my.isPortrait) {
  //   // width = floor(my.width * (3 / 9));
  //   width = my.width;
  //   height = floor(my.height * (6 / 16));
  //   // y0 = my.height - height;
  // }
  let regionIndex = 0;
  my.pane0 = new Pane({ backgImg, x0, y0, z0, width, height, refBox, regionIndex });
}

function create_pane1() {
  let backgImg = my.backgImg;
  let rr = my.paneRatio;
  let x0 = 0;
  let y0 = my.height * 0.25;
  let z0 = 1;
  let height = my.height * 0.75;
  let width = my.width;
  let initCentered = 1;
  let refBox = my.refBox;
  // if (my.isPortrait) {
  //   width = my.width;
  //   x0 = 0;
  // }
  let regionIndex = 1;
  my.pane1 = new Pane({ backgImg, x0, y0, z0, width, height, initCentered, refBox, regionIndex });
}
