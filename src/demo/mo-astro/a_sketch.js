// https://editor.p5js.org/jht9629-nyu/sketches ----
// https://github.com/molab-itp/p5moLibrary
// Display regions of a Astronomical infographic with animated panning and zooming
// controlled by mo-astro-remote

let my = {};

function preload() {
  //
  my.backgImg = loadImage('../../assets/The_Celestial_Zoo.png');
  my.qrcodeImg = loadImage('../../qrcode/mo-astro-qrcode.png');
}

function setup() {
  //
  a_setup();

  // Create but dont start animation
  my.animLoop = new Anim({ target: my, time: 15 });
  // if (my.scanFlag) {
  my.animLoop.start();
  // }

  // dstore interface
  let config = fb_.init('jht9629');
  // let config = fb_.init('jht1493');
  console.log('?v=6 config.projectId', config.projectId, 'configLabel', config.configLabel);

  my.dstore_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.astro_index = 0;

  my.play_step_flag = true;
  my.show_qrcode_flag = true;

  dstore_init({ dstore_host_init });
}

function dstore_host_init() {
  dstore_astro_onChild({ mo_astro_index_changed });
}

function draw() {
  //
  background(0);
  my.pane1.render();
  my.pane0.render();
  my.pane2.render();
  ui_init_update();

  // my.animLoop.step({ action: nextRefAction, loop: my.scanFlag });
  my.animLoop.step({ action: step_check, loop: 1 });
}

function step_check() {
  // advance in landscape view
  if (my.play_step && !my.isPortrait) {
    console.log('step_check next_action');
    next_action();
  }
}
