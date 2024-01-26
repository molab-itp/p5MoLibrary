'use strict';

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

console.log('BlackFacts player.js');

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

let dateFactsKeys = Object.keys(dateFacts).sort();
let nfacts = dateFactsKeys.length;

function dateFact(index) {
  let key = dateFactsKeys[index % nfacts];
  return dateFacts[key];
}

// called from mo_blackfacts_index_changed
// play video given index into dateFacts
//
function execCommandIndex(index) {
  if (!player || !player.cueVideoById) {
    console.log('execCommandIndex no player', player);
    return;
  }
  if (!my.isPortraitView) {
    my.execRemoteTrigger = 1;
  }

  let entry = dateFact(index);
  let videoKey = entry.videoKey;
  console.log('execCommandIndex index', index, 'entry', entry, 'videoKey', videoKey);

  player.cueVideoById(videoKey);
}

// called when video play ends
function execCommand() {
  if (my.execRemoteTrigger) {
    // Ignore play list if we were last triggered remotedly
    console.log('execCommand my.execRemoteTrigger return');
    return;
  }
  if (my.playNext) {
    console.log('execCommand my.playNext');
    next_action();
    return;
  }

  videoKey = getVideoKey(playlist[playlistIndex]);
  console.log('About to play video ' + videoKey);
  player.cueVideoById(videoKey);
  playlistIndex = (playlistIndex + 1) % playlist.length;
  console.log('Incremented playlistIndex to: ' + playlistIndex);

  function getVideoKey(playlistEntry) {
    return playlistEntry === 'today' ? getDateVideoKey() : playlistEntry;
  }
}

function getDateVideoKey(date) {
  // Default to today
  let theDate = date || new Date();
  let key = dateKey(theDate);
  let videoKey = dateFacts[key].videoKey;
  return videoKey;

  function formatDay(num) {
    return ('00' + num).slice(-2);
  }

  function dateKey(theDay) {
    return formatDay(1 + theDay.getMonth()) + formatDay(theDay.getDate());
  }
}

function setupVideo() {
  console.log('creating YTPlayer');

  player = new YT.Player('id_player', {
    playerVars: {
      origin: location.origin,
    },
    events: {
      onReady: function (event) {
        console.log('YTPlayer ready');
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
            console.log('YT.PlayerState.ENDED ' + videoKey);
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
