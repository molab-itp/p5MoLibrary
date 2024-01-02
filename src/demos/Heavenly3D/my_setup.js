//

function my_setup() {
  my.backgImgIndex = 0;
  my.dirIndex = 0;
  my.dirs = [
    //
    dirRight,
    dirStop,
    dirLeft,
    dirStop,
    dirUp,
    dirStop,
    dirDown,
    dirStop,
  ];
}

let dirRight = [0, 1, 0];
let dirLeft = [0, -1, 0];
let dirUp = [1, 0, 0];
let dirDown = [-1, 0, 0];
let dirStop = [0, 0, 0];
let dirZRight = [0, 0, 1];
let dirZLeft = [0, 0, -1];
