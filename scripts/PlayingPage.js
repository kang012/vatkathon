var prevScrollPos = window.pageYOffset;
var bigNav = document.getElementById('big-nav');
var slider = document.getElementById('slider');
var music = document.getElementById('music');
var currentTime = document.getElementById('current-time');
var songDuration = document.getElementById('song-duration');
var playButton = document.getElementById('play-button');
var progressMusic = document.getElementById('progress-music');
var progressCurrent = document.getElementById('progress-current-music');
var expandLyric = document.getElementById('expand-lyric');
var lyricContent = document.getElementById('lyric-content');
var currentVolume = document.getElementById('current-volume');
var volumeBar = document.getElementById('volume-bar');
var volumeSlider = document.getElementById('slider-volume');
var progressMusicWidth = progressMusic.offsetWidth;
var onHold = false;
var onVolumeHold = false;
var lyricNotExpended = true;
$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 5,
        nav: true,
        loop: false
      }
    }
  });
});

/* scrolling increasing pageY value so if it higher than default(1) hide navbar   */
window.onscroll = function hideNav() {
  var currentScrollPos = window.pageYOffset;
  if (currentScrollPos > prevScrollPos) {
    bigNav.style.top = '-50px';
  } else {
    bigNav.style.top = '0';
  }
  prevScrollPos = currentScrollPos;
};
// Convert second to min:sec
function secondToMin(inputTime) {
  var sec = Math.floor(inputTime) % 60;
  var min = Math.trunc(Math.floor(inputTime) / 60);
  if (sec < 10) {
    return min + ':0' + sec;
  }
  return min + ':' + sec;
}
// sync slider with current music time
function timeUpdate() {
  var playTime = progressMusicWidth * (music.currentTime / music.duration);
  slider.style.left = ((playTime - slider.offsetWidth)) + 'px';
  currentTime.innerHTML = secondToMin(music.currentTime);
  songDuration.innerHTML = secondToMin(music.duration);
  if (music.ended) {
    playButton.innerHTML = '<i class="fas fa-play"></i>';
  }
}
function clickPlay() {
  if (music.paused) {
    music.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    music.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i>';
  }
}

/* Reuseable function */
function getPosition(element) {
  return element.getBoundingClientRect().left;
}
// get width based on position of mouse click in a div
function clickPercent(event, timeLine, timeLineLength) {
  return (event.clientX - getPosition(timeLine)) / timeLineLength;
}
function moveSlider(event) {
  // get width base on mouse coordinate
  var newPos = event.clientX - getPosition(progressMusic);
  if (newPos > 0 && newPos < progressMusic.offsetWidth) {
    progressCurrent.style.width = newPos + 'px';
  } else if (newPos < 0) {
    progressCurrent.style.width = 0;
  } else if (newPos >= progressMusic.offsetWidth) {
    progressCurrent.style.width = 100 + '%';
  }
}

function moveVolumeSlider(event) {
  // get width base on mouse coordinate
  var newPos = event.clientX - getPosition(volumeBar);
  if (newPos > 0 && newPos < volumeBar.offsetWidth) {
    currentVolume.style.width = newPos + 'px';
  } else if (newPos < 0) {
    currentVolume.style.width = 0;
  } else if (newPos >= volumeBar.offsetWidth) {
    currentVolume.style.width = 100 + '%';
  }
}

function mouseDownVolume() {
  onVolumeHold = true;
  window.addEventListener('mousemove', moveVolumeSlider);
}
function mouseUpVolume(event) {
  if (onVolumeHold === true) {
    moveVolumeSlider(event);
    window.removeEventListener('mousemove', moveVolumeSlider);
    music.volume = 1.0 * clickPercent(event, volumeBar, volumeBar.offsetWidth);
  }
  onVolumeHold = false;
}


function mouseDown() {
  onHold = true;
  window.addEventListener('mousemove', moveSlider);
  music.removeEventListener('timeupdate', timeUpdate);
}
function mouseUp(event) {
  if (onHold === true) {
    moveSlider(event);
    window.removeEventListener('mousemove', moveSlider);
    music.currentTime = music.duration * clickPercent(event, progressMusic, progressMusicWidth);
    music.addEventListener('timeupdate', timeUpdate);
  }
  onHold = false;
}

// Toggle expand or narrow lyric section
function viewMoreLyric() {
  if (lyricNotExpended) {
    lyricContent.style.height = 'auto';
    lyricContent.style.overflow = 'visible';
    expandLyric.innerHTML = 'View Less';
    lyricNotExpended = false;
  } else {
    lyricContent.style.height = '50vh';
    lyricContent.style.overflow = 'hidden';
    expandLyric.innerHTML = 'View More';
    lyricNotExpended = true;
  }
}
// Toggle Play/Pause button
playButton.addEventListener('click', clickPlay);
// Change the position of slider base on music time
music.addEventListener('timeupdate', timeUpdate);
// Make progressbar clickable
progressMusic.addEventListener('click', function changeMusicDuration(event) {
  moveSlider(event);
  music.currentTime = music.duration * clickPercent(event, progressMusic, progressMusicWidth);
});
// Make slider draggable
slider.addEventListener('mousedown', mouseDown);
window.addEventListener('mouseup', mouseUp);
// Expand or narrow lyric section
expandLyric.addEventListener('click', viewMoreLyric);

// make volume clickable
volumeBar.addEventListener('click', function changeVolume(event) {
  moveVolumeSlider(event);
  music.volume = 1.0 * clickPercent(event, volumeBar, volumeBar.offsetWidth);
});
// make volume draggable
volumeSlider.addEventListener('mousedown', mouseDownVolume);
window.addEventListener('mouseup', mouseUpVolume);
/* how to get new value base on clicked position
  newValue = (currentLength/fullLength) * highestValue;
*/
