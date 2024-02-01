'use strict';

console.log('BlackFacts player.js');

let dateFactsKeys = Object.keys(dateFacts).sort();
let nfacts = dateFactsKeys.length;

let videoKey = null;
let player = null;
let playlistIndex = 0;

// https://dev.blackfacts.com/kiosk?delay=2000&volume=50&playlist=today,451kA90ehvA
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let playlist = (params.playlist || 'today').split(',');
let delay = params.delay || 0;
let volume = parseInt(params.volume || '0', 10);

//document.documentElement.requestFullscreen();

function onYouTubeIframeAPIReady() {
  console.log('BlackFacts onYouTubeIframeAPIReady player', player);
  if (!player) {
    setupVideo();
  }
}

function onYouTubePlayerAPIReady() {
  console.log('BlackFacts onYouTubePlayerAPIReady player', player);
  if (!player) {
    setupVideo();
  }
}

function execPlaylist() {
  if (playlist.length > 0) {
    if (delay > 0) {
      window.setTimeout(() => execCommand(), delay);
    } else {
      execCommand();
    }
  }
}

function dateFactForIndex(index) {
  let key = dateFactsKeys[index % nfacts];
  return dateFacts[key];
}

// called from mo_blackfacts_index_value
// play video given index into dateFacts
//
function execCommandIndex(index) {
  if (!player || !player.cueVideoById) {
    console.log('execCommandIndex no player', player);
    return;
  }
  // if (!my.isPortraitView) {
  //   // In landscape view, we'll keep advancing
  //   my.execRemoteTrigger = 1;
  // }

  // flag having received index event
  my.execRemoteTrigger = 1;

  let entry = dateFactForIndex(index);
  let videoKey = entry.videoKey;
  console.log('execCommandIndex index', index, 'entry', entry);
  console.log('execCommandIndex videoKey', videoKey);

  // reset play list to selected video
  playlist = [videoKey];
  playlistIndex = 0;

  player.cueVideoById(videoKey);
}

// called when video play ends
function execCommand() {
  // In landscape view, we'll keep advancing
  if (my.execRemoteTrigger) {
    console.log('execCommand my.execRemoteTrigger next_action');
    next_action();
    return;
  }
  if (my.playNext) {
    console.log('execCommand my.playNext next_action');
    next_action();
    return;
  }
  // Select next video from playList
  //
  videoKey = getVideoKey(playlist[playlistIndex]);
  console.log('About to play video ' + videoKey);
  player.cueVideoById(videoKey);
  playlistIndex = (playlistIndex + 1) % playlist.length;
  console.log('Incremented playlistIndex to: ' + playlistIndex);
}

function getVideoKey(playlistEntry) {
  return playlistEntry === 'today' ? getDateVideoKey() : playlistEntry;
}

function getDateVideoKey(date) {
  // Default to today
  let theDate = date || new Date();
  let key = dateKey(theDate);
  let videoKey = dateFacts[key].videoKey;
  return videoKey;
  //
  function dateKey(theDay) {
    return formatDay(1 + theDay.getMonth()) + formatDay(theDay.getDate());
  }
  function formatDay(num) {
    return ('00' + num).slice(-2);
  }
}

function setupVideo() {
  console.log('BlackFacts setupVideo creating YTPlayer');
  my.blackfacts_player_inited = 1;
  player = new YT.Player('id_player', {
    playerVars: {
      origin: location.origin,
    },
    events: {
      onReady: function (event) {
        console.log('BlackFacts YTPlayer ready');
        // The player play method cueVideoById just became available.
        //player.unMute();
        //player.setVolume(volume);
        //console.log('Set volume to ' + volume);
        //player.mute();
        execPlaylist();
      },
      onStateChange: function (event) {
        let state = event.data;

        switch (state) {
          case -1:
            // console.log('YT.Player unstarted');
            break;

          case YT.PlayerState.ENDED:
            console.log('BlackFacts YT.PlayerState.ENDED ' + videoKey);
            execCommand();
            break;

          case YT.PlayerState.PAUSED:
            // console.log('YT.PlayerState.PAUSED ' + videoKey);
            break;

          case YT.PlayerState.PLAYING:
            //player.unMute();
            //player.setVolume(volume);
            //console.log('Set volume to ' + volume);
            // console.log('YT.PlayerState.PLAYING ' + videoKey);
            break;

          case YT.PlayerState.BUFFERING:
            // console.log('YT.PlayerState.BUFFERING ' + videoKey);
            break;

          case YT.PlayerState.CUED:
            // console.log('YT.PlayerState.CUED');
            player.playVideo();
            break;
        }
      },
      onError: function (event) {
        let errorNum = event.data;

        switch (errorNum) {
          case 2:
            console.log('YT.Player error:  The request contains an invalid parameter value.');
            break;

          case 5:
            console.log('YT.Player error: The requested content cannot be played in an HTML5 player.');
            break;

          case 100:
            console.log('YT.Player error: The video requested was not found.');
            break;

          case 101:
          case 150:
            console.log(
              'YT.Player error: The owner of the requested video does not allow it to be played in embedded players.'
            );
            break;
        }
      },
    },
  });
}
