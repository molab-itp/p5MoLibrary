//
function mousePressed() {
  //
  if (my.earth.pointInside(mouseX, mouseY)) {
    setFocus(my.earth);
  } else if (my.body2.pointInside(mouseX, mouseY)) {
    setFocus(my.body2);
  } else if (my.camBody.pointInside(mouseX, mouseY)) {
    setFocus(my.camBody);
  } else {
    my.shiftTracking = 1;
    my.panX0 = mouseX;
    my.panY0 = mouseY;
  }
}

function mouseDragged() {
  //
  let inX = mouseX >= 0 && mouseX < width;
  let inY = mouseY >= 0 && mouseY < height;
  let onCanvas = inX && inY;
  if (onCanvas) {
    if (my.shiftTracking) {
      my.panX += my.panX0 - mouseX;
      my.panY += my.panY0 - mouseY;
      my.panX0 = mouseX;
      my.panY0 = mouseY;
    }
  }
  // return false to allow scrolling on mobile
  return !onCanvas;
}

function mouseReleased() {
  //
  // console.log('mouseReleased');
  // my.mouseTracking = 0;
  my.shiftTracking = 0;
}
