function sound_getBlob() {
  my.soundBlob = my.soundFile.getBlob();
  // Upload the sound blob
  fstore_sound_upload_blob(my.soundBlob, 0);
}

function fstore_sound_upload_blob(blob, count) {
  console.log('fstore_sound_upload_blob', blob);
  let { storage, ref, uploadBytes } = fb_.fstore;
  my.soundPath = next_soundPath(count);
  ui_log('fstore_sound_upload_blob my.soundPath', my.soundPath);
  const storageRef = ref(storage, my.soundPath);
  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, blob)
    .then((snapshot) => {
      // ui_log('snapshot.metadata.fullPath ' + snapshot.metadata.fullPath);
      // console.log('snapshot', snapshot);
      // console.log('Uploaded path', path);
      ui_log('upload ', my.soundPath);
      my.fstore_sound_upload_completed = 1;
    })
    .catch((error) => {
      // Handle any errors
      ui_error('fstore_sound_upload_blob error', error);
    });
}

function next_soundPath(count) {
  // console.log('next_soundPath');
  let str = (count + my.count_base + 1).toString().padStart(my.image_seq_pad, '0');
  return `${my.dstore_rootPath}/${my.clipsName}/${str}.wav`;
}

function fstore_sound_download() {
  // console.log('fstore_sound_download ');
  let path = next_soundPath(0);
  // ui_log('fstore_sound_download next_imagePath ' + path);
  let { storage, ref, getDownloadURL } = fb_.fstore;
  getDownloadURL(ref(storage, path))
    .then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
        // ui_log('fstore_sound_download blob ' + blob);
        ui_log('sound download ' + path);
        sound_play_blob(blob);
      };
      xhr.open('GET', url);
      xhr.send();
    })
    .catch((error) => {
      // Handle any errors
      ui_error('fstore_sound_download error', error);
    });
}
function sound_play_blob(blob) {
  my.sound_download_blob = blob;
  const reader = new FileReader();
  reader.onload = function (e) {
    const srcUrl = e.target.result;
    // console.log('sound_play_blob srcUrl', srcUrl);
    my.sound_srcUrl = srcUrl;
    my.sound_downFile = new p5.SoundFile(
      srcUrl, //
      sound_cb_ok,
      sound_cb_error,
      sound_cb_while
    );
  };
  reader.readAsDataURL(blob);

  function sound_cb_ok() {
    // console.log('sound_cb_ok');
    sound_downloaded();
  }

  function sound_cb_error(error) {
    ui_error('sound_cb_error', error);
  }

  function sound_cb_while(prog) {
    // console.log('sound_cb_while prog', prog);
  }
}
