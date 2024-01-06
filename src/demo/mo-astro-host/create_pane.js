//
function create_pane0() {
  let fwidth = my.width;
  let height = my.height;
  let backgImg = my.backgImg;
  let rr = 1 - my.paneRatio;
  let x0 = 0;
  let y0 = 0;
  let z0 = 8;
  let width = floor(fwidth * rr);
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

function create_pane1() {
  let fwidth = my.width;
  let height = my.height;
  let backgImg = my.backgImg;
  let rr = my.paneRatio;
  let x0 = floor(fwidth * (1 - rr));
  let y0 = 0;
  let z0 = 4.5;
  let initCentered = 1;
  let width = floor(fwidth * rr);
  let refBox = my.refBox;
  if (my.isPortrait) {
    width = my.width;
    x0 = 0;
  }
  let regionIndex = 1;
  my.pane1 = new Pane({ backgImg, x0, y0, z0, width, height, initCentered, refBox, regionIndex });
}
