// https://editor.p5js.org/jht9629-nyu/sketches ----
// https://github.com/molab-itp/p5moLibrary
// Display regions of a Astronomical infographic with animated panning and zooming
// controlled by mo-astro-remote

let my = {};

function preload() {
  //
  my.backgImg = loadImage('../../assets/The_Celestial_Zoo.png');
}

function setup() {
  //
  astro_setup();

  // Create but dont start animation
  my.animLoop = new Anim({ target: my, time: 15 });

  // dstore interface
  let config = fb_.init('jht9629');
  // let config = fb_.init('jht1493');
  console.log('?v=62 config.projectId', config.projectId, 'configLabel', config.configLabel);

  my.dstore_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.astro_index = 0;
  // my.logLoud = 1;

  dstore_init();
}

function draw() {
  //
  background(0);
  my.pane1.render();
  my.pane0.render();
  ui_init_update();
}

function dstore_init() {
  // console.log('dstore_init ');
  let { signInAnonymously, auth } = fb_;
  signInAnonymously(auth)
    .then(() => {
      my.uid = auth.currentUser.uid;
      // console.log('dstore_init my.uid', my.uid);
      ui_log(my, 'dstore_init', my.uid);

      dstore_device_onChild();
      dstore_astro_onChild({ mo_astro_index_changed });
    })
    .catch((error) => {
      ui_log(my, 'dstore_init error', error);
    });
}

function mo_astro_index_changed(newValue, oldValue) {
  // console.log('mo_astro_index_changed newValue', newValue, 'oldValue', oldValue);
  refIndexAssign(newValue);
  my.astro_index = newValue;
}
