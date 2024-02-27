//
function my_init1() {
  // updated to verify change on mobile
  my.version = '?v=21';
  // Aspect ratio of video capture
  my.vwidth = 480;
  my.vheight = 640;
  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.mo_app = 'mo-pix-chip-grid';
  my.roomName = 'room-pixel-grid';
  my.nameDevice = '';
  // my.logLoud = 1; // 1 to show ui_log in console
  // my.nstepCycle = [8, 16, 32];
  // my.updateTimes = [0.2, 0.1, 0.02];
  // my.nstepCycle = [8, 16, 32, 64, 128];
  // my.updateTimes = [0.2, 0.1, 0.02, 0.01, 0.01];
  my.nstepCycle = [8, 16, 32, 64];
  my.updateTimes = [0.2, 0.1, 0.05, 0.02];
  my.nstepIndex = 0;
  my.nstepDir = 1;
  my.margin = 0.1;
  my.settingsFlag = 1;
  my.logSummaryFlag = 0;
  my.logDetailFlag = 0;
  my.scanFlag = 1;
  my.faceFlag = 1;
  my.videoFlag = 1;
  my.storeFlag = 0;
  my.scrollFlag = 1;
  my.scrollOnStartFlag = 0;
  my.scrollStopSecs = 4;
  my.byPixel = 0;
  my.perFrame = 30;
  my.shapeIndex = 0;
  my.storeProps = {
    roomName: 1,
    nameDevice: 1,
    name: 1,
    nstep: 1,
    margin: 1,
    settingsFlag: 1,
    logSummaryFlag: 1,
    logDetailFlag: 1,
    storeFlag: 1,
    scanFlag: 1,
  };
}
