//

function ui_init() {
  let msg = [
    '(' + my.version.substring(1) + ') drag mouse on the canvas to create line drawing',
    // 'press startTimedDraw to re-draw it in ' + my.drawPoints.lapse + ' seconds',
  ];
  createDiv(msg.join('<br/>'));

  let runCheckBox = createCheckbox('Run ', my.drawPoints.run).changed(function () {
    my.drawPoints.run = this.checked();
  });
  runCheckBox.style('display:inline;');

  createButton('start').mousePressed(function () {
    my.drawPoints.startTimedDraw();
  });
  createButton('stop').mousePressed(function () {
    my.drawPoints.stopTimedDraw();
  });
  createButton('clear').mousePressed(function () {
    my.drawPoints.clearDrawing();
  });

  // createElement('br');

  // // createSlider(min, max, oldVal, step)
  // let lapse_slider = createSlider(0, 30, my.drawPoints.lapse).input(function () {
  //   my.drawPoints.lapse = this.value();
  //   // console.log('create_slider aVal ', aVal, 'type', typeof aVal);
  //   valSpan.html(formatNumber(my.drawPoints.lapse) + '');
  //   my.drawPoints.startTimedDraw();
  // });
  // lapse_slider.style('width:50%');
  // let valSpan = createSpan(my.drawPoints.lapse + '');

  // createElement('br');
  // createSpan('save_label: ');

  my.saveLabelInput = createInput(my.drawPoints.save_label).input(function () {
    my.drawPoints.save_label = this.value();
  });
  my.saveLabelInput.style('width:60px');

  createButton('next').mousePressed(function () {
    // my.drawPoints.restore_drawing();
  });
  createButton('previous').mousePressed(function () {
    // my.drawPoints.save_drawing();
  });
  createButton('add').mousePressed(function () {
    // my.drawPoints.save_to_url();
  });

  // createButton('restore').mousePressed(function () {
  //   my.drawPoints.restore_drawing();
  // });
  // createButton('save').mousePressed(function () {
  //   my.drawPoints.save_drawing();
  // });
  // createButton('save_url').mousePressed(function () {
  //   my.drawPoints.save_to_url();
  // });
  // createButton('clear_url').mousePressed(function () {
  //   my.drawPoints.clear_url();
  // });
}
