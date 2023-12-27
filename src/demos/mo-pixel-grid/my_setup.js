//
function my_setup() {
  my.version = '?v=22'; // update to verify change on mobile
  my.vwidth = 480; // Aspect ratio of video capture
  my.vheight = 640;
  my.dbStoreRootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.name = '';
  my.nstep = 16;
  my.margin = 0.1;
  my.settingsFlag = 1;
  my.logSummaryFlag = 0;
  my.logDetailFlag = 0;
  my.scanFlag = 1;
  my.faceFlag = 1;
  my.videoFlag = 1;
  my.storeFlag = 0;
  my.scrollFlag = false;
  my.scrollOnStartFlag = 0;
  my.scrollStopSecs = 4;
  my.nstepScale = 2;
  my.byPixel = 0;
  my.perFrame = 30;
  my.shapeIndex = 0;
  my.updateTime = 0.2;
  my.storeProps = {
    roomName: 1,
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
