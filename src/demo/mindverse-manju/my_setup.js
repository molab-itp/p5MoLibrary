//
function my_setup() {
  //
  my.version = '?v=119';

  // my.primaryPortion = 0.333;
  my.primaryPortion = 0.5;
  // let bottomMargin = 0;
  let bottomMargin = 90;

  my.canvas = createCanvas(windowWidth, windowHeight - bottomMargin);
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

// Primary pane
//
function create_pane0() {
  let backgImg = my.backgImg;

  let x0 = 0;
  let y0 = my.height * my.primaryPortion;
  let z0 = 1;
  let height = my.height * (1 - my.primaryPortion);

  let width = my.width;
  let refBox = my.refBox;
  let regionIndex = 0;
  my.pane0 = new Pane({ backgImg, x0, y0, z0, width, height, refBox, regionIndex });
}

// Secondary pane
//
function create_pane1() {
  let backgImg = my.backgImg;

  let x0 = 0;
  let y0 = 0;
  let z0 = 1;
  let height = my.height * my.primaryPortion;

  let width = my.width;
  let initCentered = 0;
  let refBox = my.refBox;
  let regionIndex = 1;
  my.pane1 = new Pane({ backgImg, x0, y0, z0, width, height, initCentered, refBox, regionIndex });
}
