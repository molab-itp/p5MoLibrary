//
export function create_myVideo(my) {
  // console.log('create_myVideo my.video', my.video);
  if (my.video) {
    my.video.remove();
  }
  let options = { video: { facingMode: my.facingMode } };
  my.video = createCapture(options);
  my.video.size(my.vwidth, my.vheight);
  my.video.hide();
}
//
export function video_ready(my) {
  return (
    my.video && //
    my.video.loadedmetadata &&
    my.video.width > 0 &&
    my.video.height > 0
  );
}

window.create_myVideo = create_myVideo;
window.video_ready = video_ready;
