function sound_init() {
  console.log('getAudioContext().state', getAudioContext().state);
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

  // create an audio in
  my.mic = new p5.AudioIn();

  // users must manually enable their browser microphone for recording to work properly!
  my.mic.start();

  // create a sound recorder
  my.recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  my.recorder.setInput(my.mic);

  // create an empty sound file
  // that we will use to playback the recording
  my.soundFile = new p5.SoundFile();
  my.sound_record_started = 0;
}

function sound_record_start() {
  console.log('sound_record_start');

  if (my.sound_record_started) return;
  my.sound_record_started = 1;

  // Tell recorder to record to a p5.SoundFile
  // which we will use for playback
  my.recorder.record(my.soundFile);
}

function sound_record_stop() {
  console.log('sound_record_stop');

  my.sound_record_started = 0;

  // stop recorder, and send the result to soundFile
  my.recorder.stop();

  my.fstore_sound_upload_started = 1;
  my.fstore_sound_upload_completed = 0;
  my.sound_download_soundFile = null;

  // Give record a sec before asking for blob
  setTimeout(sound_getBlob, 1 * 1000);
}

function sound_getBlob() {
  my.soundBlob = my.soundFile.getBlob();

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
  return `${my.dbStoreRootPath}/${my.clipsName}/${str}.wav`;
}

function sound_playback_start() {
  // console.log('sound_playback_start', my.sound_download_soundFile ? 'soundFile' : '-');

  // skip if soundfile is already playing
  if (my.sound_download_soundFile) {
    return;
  }

  // Wait for upload to complete
  if (
    my.fstore_sound_upload_started && //
    !my.fstore_sound_upload_completed
  ) {
    return;
  }

  fstore_sound_download();
}

function sound_playback_stop() {
  // console.log('sound_playback_stop', my.sound_download_soundFile ? 'soundFile' : '-');

  if (!my.sound_download_soundFile) {
    return;
  }

  my.sound_download_soundFile.stop();
  my.sound_download_soundFile = null;
  my.sound_download_blob = null;
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
        ui_log('download ' + path);
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
    my.sound_download_soundFile = new p5.SoundFile(
      srcUrl, //
      sound_cb_ok,
      sound_cb_error,
      sound_cb_while
    );
  };
  reader.readAsDataURL(blob);

  function sound_cb_ok() {
    // console.log('sound_cb_ok');
    my.sound_download_soundFile.play();
    my.sound_download_soundFile.loop();
  }

  function sound_cb_error(error) {
    ui_error('sound_cb_error', error);
  }

  function sound_cb_while(prog) {
    // console.log('sound_cb_while prog', prog);
  }
}

// https://p5js.org/reference/#/p5.SoundFile
// new p5.SoundFile(path, [successCallback], [errorCallback], [whileLoadingCallback])

// https://stackoverflow.com/questions/34934862/how-to-replay-an-audio-blob-in-javascript
// const reader = new FileReader();
// reader.onload = function(e) {
//     const srcUrl = e.target.result;
//     audioNode.src = srcUrl;
// };
// reader.readAsDataURL(blob);

// https://p5js.org/reference/#/p5/getAudioContext
// function draw() {
//   background(255);
//   textAlign(CENTER);

//   if (getAudioContext().state !== 'running') {
//     text('click to start audio', width/2, height/2);
//   } else {
//     text('audio is enabled', width/2, height/2);
//   }
// }
// function touchStarted() {
//   if (getAudioContext().state !== 'running') {
//     getAudioContext().resume();
//   }
//   var synth = new p5.MonoSynth();
//   synth.play('A4', 0.5, 0, 0.2);
// }

// startAudioContext
// userStartAudio

// https://p5js.org/reference/#/p5/userStartAudio

// let a_audioCtx = getAudioContext();
// a_audioCtx.resume();
