const audio = document.querySelector('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeBtn = document.getElementById('volume');
const progress = document.querySelector('.progress');
const progressContainer = document.getElementById('progress-container');
const volumeContainer = document.getElementById('volume-container');
const volumeProgress = document.getElementById('volume-progress');
const musicContainer = document.getElementsByTagName('div')[2];
const allDivs = document.querySelectorAll('div');
const lastDiv = allDivs[allDivs.length - 1];
const loadText = document.getElementById('text1');
const volumeBtnContainer = document.getElementsByTagName('button')[3];
const volumeIcon = volumeBtnContainer.querySelector('i');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const gif = document.querySelector('.background-image');
var musicTitle = document.createElement('h1');
musicTitle.innerHTML = 'Chill Chords : Your Relaxation Rhythms Retreat🌻';

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
    videoId: 'SkTZu9oPN6E',
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
  console.log('player is ready: ');
  lastDiv.classList.add('show');
  loadText.textContent = 'Press space to play!';
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

const setProgress = (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = player.getDuration();
  console.log('clicked on load bar');

  player.seekTo((clickX / width) * duration, true);
};

const toggleVolume = (e) => {
  const width = volumeContainer.clientWidth;
  const clickX = e.offsetX;
  player.setVolume(clickX);
  volumeProgress.style.width = `${clickX}%`;
  console.log('vume working');
};

function stopVideo() {
  player.stopVideo();
}

function muteVideo() {
  console.log('mute is working');
  if (volumeIcon.classList.contains('fa-volume-up')) {
    console.log('Muted');
    volumeBtn.querySelector('i.fas').classList.remove('fa-volume-up');
    volumeBtn.querySelector('i.fas').classList.add('fa-volume-off');
    player.mute();
  } else {
    console.log('unmute');
    volumeBtn.querySelector('i.fas').classList.add('fa-volume-up');
    volumeBtn.querySelector('i.fas').classList.remove('fa-volume-off');
    player.unMute();
  }
}

function onPlayerStateChange(event) {
  console.log(event.data);

  if (event.data === 0) {
    goNext();
  } else if (event.data === 2) {
    loadText.innerHTML = 'Paused... Click space to play!';
  } else if (event.data === 3) {
    loadText.innerHTML = 'Buffering';
  } else {
    loadText.innerHTML = 'Listing To Some Good Music huh!';
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

progressContainer.addEventListener('click', setProgress);
volumeBtn.addEventListener('click', muteVideo);
volumeContainer.addEventListener('click', toggleVolume);

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

currentindex = Math.floor(Math.random() * 11);
console.log(currentindex);

fetch(
  `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=30&playlistId=PL2EF4HKZto6swCHoX1c46zBRsxqP9Vp1Q&key=${apiKey}`
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    songLists.push(...data.items);

    if (songLists.length) {
      const currentItem = songLists[currentindex];
      cover.src = '/images/image (4).gif';
      title.innerHTML = `${musicTitle.textContent}`;
      // console.log(title.innerText);
    }
  });

const goNext = () => {
  currentindex = Math.floor(Math.random() * 11);
  console.log(currentindex);
  if (currentindex < songLists.length - 1) {
    currentindex++;
  } else {
    currentindex = 0;
  }
  const currentItem = songLists[currentindex];
  cover.src = currentItem.snippet.thumbnails.maxres.url;
  // title.innerHTML = currentItem.snippet.title;
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
  currentindex = Math.floor(Math.random() * 11);
  console.log(currentindex);
  currentindex--;
  if (currentindex < 0) {
    currentindex = songLists.length - 1;
  }
  const currentItem = songLists[currentindex];
  cover.src = currentItem.snippet.thumbnails.maxres.url;
  // title.innerHTML = currentItem.snippet.title;
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

const gifList = [
  '/images/image (1).gif',
  '/images/image (2).gif',
  '/images/image (3).gif',
  '/images/image (4).gif',
  '/images/image (5).gif',
  '/images/image (6).gif',
  '/images/image (7).gif',
  '/images/image (8).gif',
  '/images/image (9).gif',
  '/images/image (10).gif',
  '/images/image (11).gif',
  '/images/image (12).gif',
  '/images/image (13).gif',
  '/images/image (14).gif',
  '/images/image (15).gif',
  '/images/image (16).gif',
  '/images/image (17).gif',
  '/images/image (18).gif',
  '/images/image (19).gif',
  '/images/image (20).gif',
  '/images/image (21).gif',
  '/images/image (22).gif',
  '/images/image (23).gif',
  '/images/image (24).gif',
  '/images/image (25).gif',
  '/images/image (28).gif',
  '/images/image (29).gif',
  '/images/image (30).gif',
  '/images/image (31).gif',
  '/images/image (32).gif',
  '/images/image (33).gif',
  '/images/image (34).gif',
  '/images/image (35).gif',
  '/images/image (36).gif',
  '/images/image (37).gif',
  '/images/image (38).gif',
  '/images/image (39).gif',
  '/images/image (41).gif',
];

const changeGif = () => {
  randomIndex = Math.floor(Math.random() * gifList.length - 1);
  imageUrl = gifList[randomIndex];
  gif.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(36, 128, 128, 0.5)), url('${imageUrl}')`;
  /* gif.style.backgroundSize = 'contain';
  gif.style.backgroundPosition = 'center'; */
};

setInterval(changeGif, 3 * 60 * 1000);

changeGif();

document.addEventListener('DOMContentLoaded', () => {
  var linkedIn = document.querySelector('.linkedin-icon');

  linkedIn.addEventListener('mouseenter', () => {
    linkedIn.style.color = '#fff';
  });

  linkedIn.addEventListener('mouseleave', () => {
    linkedIn.style.color = '#c6cfd3';
  });
});
