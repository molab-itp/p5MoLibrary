//
function updateTimeGap(activities) {
  for (let index = 1; index < activities.length; index++) {
    let nowEnt = activities[index - 1];
    let nowTime = new Date(nowEnt.date_s).getTime();
    let pastEnt = activities[index];
    let pastTime = new Date(pastEnt.date_s).getTime();
    nowEnt.gap = nowTime - pastTime - nowEnt.time;
    nowEnt.gap_s = convertTimeToSeconds(nowEnt.gap);
  }
}
window.updateTimeGap = updateTimeGap;

function convertTimeToSeconds(time) {
  let str = '';
  let secs = time / 1000;
  let mins = floor(secs / 60);
  // console.log('mins', mins);
  secs -= mins * 60;
  let hours = floor(mins / 60);
  // console.log('hours', hours);
  mins -= hours * 60;
  let days = floor(hours / 24);
  // console.log('days', days);
  hours -= days * 24;
  if (secs != 0) {
    secs = secs.toFixed(3);
    str = secs + ' secs';
  }
  if (mins != 0) {
    str = mins + ' mins ' + str;
  }
  if (hours != 0) {
    str = hours + ' hours ' + str;
  }
  if (days != 0) {
    str = days + ' days ' + str;
  }
  return str;
}
window.convertTimeToSeconds = convertTimeToSeconds;
