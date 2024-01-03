//
function draw_backgImg() {
  //
  let backgImg = my.backgImgs[my.backgImgIndex];
  if (!backgImg) return;
  // Scale background image to the full width of the canvas
  let ww = backgImg.width;
  let hh = backgImg.height;
  let rr = hh / ww;
  let scale = my.panScale;

  let dx = 0;
  let dy = 0;
  let dWidth = my.width;
  let dHeight = floor(dWidth * rr);
  if (dHeight < my.height) {
    dHeight = my.height;
    dWidth = floor(dHeight / rr);
  }

  let sx = my.panX;
  let sy = my.panY;
  let sWidth = floor(ww / scale);
  let sHeight = floor(hh / scale);

  image(backgImg, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);
}

function nextBackgImg() {
  //
  if (my.backgImgs.length <= 0) return;
  my.backgImgIndex = (my.backgImgIndex + 1) % my.backgImgs.length;
  init_pan();
}

// image(img, x, y, [width], [height])
// image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight], [fit], [xAlign], [yAlign])

// draw entire image to canvas -- not used
function draw_backgImg_full() {
  let backgImg = my.backgImgs[my.backgImgIndex];
  if (!backgImg) return;
  // Scale background image to the full width of the canvas
  let w = backgImg.width;
  let h = backgImg.height;
  let wr = my.width;
  let hr = wr * (h / w);
  image(backgImg, 0, 0, wr, hr);
}
