const audio = document.querySelector('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeBtn = document.getElementById('volume');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const musicContainer = document.getElementsByTagName('div')[0];
const volumeBtnContainer = document.getElementsByTagName('button')[3];
const volumeIcon = volumeBtnContainer.querySelector('i');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

/////////////////////////////

// 2. This code loads the IFrame Player API code asynchronously.

var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '250',
    width: '250',
    videoId: 'NmOYcynrVuM',
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  // event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

function playVideo() {
  console.log('play');
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  player.playVideo();
}

function pauseVideo() {
  console.log('pause');
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  player.pauseVideo();
}

const updateprogress = () => {
  const progressPercent =
    (player.getCurrentTime() / player.getDuration()) * 100;
  progress.style.width = `${progressPercent}%`;
  /*  console.log(player.getCurrentTime());
  console.log(player.getDuration()); */
};

function stopVideo() {
  player.stopVideo();
}

function muteVideo() {
  console.log('mute is working');
  if (volumeIcon.classList.contains('fa-volume-up')) {
    console.log('Muted');
    volumeBtn.querySelector('i.fas').classList.remove('fa-volume-up');
    volumeBtn.querySelector('i.fas').classList.add('fa-volume-mute');
    player.mute();
  } else {
    console.log('unmute');
    volumeBtn.querySelector('i.fas').classList.add('fa-volume-up');
    volumeBtn.querySelector('i.fas').classList.remove('fa-volume-mute');
    player.unMute();
  }
}

function onPlayerStateChange(event) {
  console.log(event.data);
  if (event.data === 0) {
    goNext();
  }
}
playBtn.addEventListener('click', function () {
  if (musicContainer.classList.contains('play')) {
    pauseVideo();
  } else {
    playVideo();
    setInterval(updateprogress, 1000); // updateprogress
  }
});

volumeBtn.addEventListener('click', muteVideo);

/* document.getElementById('pause').addEventListener('click', function () {
  console.log('play');
  player.pauseVideo();
}); */

/* function videoId(id) {
  console.log('next song');
  player.loadVideoById(id);
}

function setupNextVideoListener(videoIdd) {
  nextBtn.addEventListener('click', () => videoId(videoIdd));
}

setupNextVideoListener('pheg4TLpt18'); */

//////////////////////////////////////////////////////////////

const apiKey = 'AIzaSyCeW8HognSNlKq7KonuSMZCTo7QSSARG88';

let currentindex = 0;

const songLists = [];

fetch(
  `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=30&playlistId=PLFf0Wzvy9UVrSdb9my7kThyLJwijK8sYZ&key=${apiKey}`
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    songLists.push(...data.items);

    if (songLists.length) {
      const currentItem = songLists[currentindex];
      cover.src = currentItem.snippet.thumbnails.maxres.url;
      title.innerHTML = currentItem.snippet.title;
      console.log(title.innerText);
    }
  });

const goNext = () => {
  if (currentindex < songLists.length - 1) {
    currentindex++;
  } else {
    currentindex = 0;
  }
  const currentItem = songLists[currentindex];
  cover.src = currentItem.snippet.thumbnails.maxres.url;
  title.innerHTML = currentItem.snippet.title;
  let apiVideoId = currentItem.snippet.resourceId.videoId;

  if (musicContainer.classList.contains('play')) {
    player.loadVideoById(apiVideoId);
  } else {
    player.loadVideoById(apiVideoId);
    stopVideo();
  }
  console.log(title.innerText);
};

const goPrevious = () => {
  currentindex--;
  if (currentindex < 0) {
    currentindex = songLists.length - 1;
  }
  const currentItem = songLists[currentindex];
  cover.src = currentItem.snippet.thumbnails.maxres.url;
  title.innerHTML = currentItem.snippet.title;
  let apiVideoId = currentItem.snippet.resourceId.videoId;

  if (musicContainer.classList.contains('play')) {
    player.loadVideoById(apiVideoId);
  } else {
    player.loadVideoById(apiVideoId);
    stopVideo();
  }
  console.log(title.innerText);
};

nextBtn.addEventListener('click', goNext);

document.addEventListener('keydown', () => {
  if (event.keyCode === 39) {
    goNext();
  }
});

prevBtn.addEventListener('click', goPrevious);

document.addEventListener('keydown', () => {
  if (event.keyCode === 37) {
    goPrevious();
  }
});
/* function demoprogress() {,
  console.log(player.getCurrentTime());
}

setInterval(demoprogress, 1000);

if (player.getCurrentTime() == player.getDuration()) {
  console.log('Video ended');
}
 */

// keyBoard controls

document.addEventListener('keydown', function (event) {
  if (event.keyCode === 32 || event.keyCode === 80) {
    console.log('key press is working');
    if (musicContainer.classList.contains('play')) {
      pauseVideo();
    } else {
      playVideo();
      setInterval(updateprogress, 1000); // updateprogress
    }
  }
});

document.addEventListener('keydown', () => {
  if (event.keyCode === 77) {
    if (volumeIcon.classList.contains('fa-volume-up')) {
      console.log('Muted');
      volumeBtn.querySelector('i.fas').classList.remove('fa-volume-up');
      volumeBtn.querySelector('i.fas').classList.add('fa-volume-mute');
      player.mute();
    } else {
      console.log('unmute');
      volumeBtn.querySelector('i.fas').classList.add('fa-volume-up');
      volumeBtn.querySelector('i.fas').classList.remove('fa-volume-mute');
      player.unMute();
    }
  }
});
//setInterval(updateprogress, 1000);
