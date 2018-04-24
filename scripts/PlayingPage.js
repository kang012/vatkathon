var prevScrollPos = window.pageYOffset;
var bigNav = document.getElementById('big-nav');
var slider = document.getElementById('slider');
var music = document.getElementById('music');
var playButton = document.getElementById('play-button');
var progressMusic = document.getElementById('progress-music');
var currentProgress = document.getElementById('progress-current-music');
var progressMusicWidth = progressMusic.offsetWidth - slider.offsetWidth;
var onHold = false;
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
// sync slider with current music time
function timeUpdate() {
  var playTime = progressMusicWidth * (music.currentTime / music.duration);
  currentProgress.style.width = (playTime - (slider.offsetWidth / 2)) + 'px';
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
function getPosition(element) {
  return element.getBoundingClientRect().left;
}
// get width based on position of mouse click in a div
function clickPercent(event) {
  return (event.clientX - getPosition(progressMusic)) / progressMusicWidth;
}
function moveSlider(event) {
  // get width base on mouse coordinate
  var newPos = event.clientX - getPosition(progressMusic) - (slider.offsetWidth / 2);
  if (newPos > 0 && newPos < progressMusic.offsetWidth) {
    currentProgress.style.width = newPos + 'px';
  } else if (newPos < 0) {
    currentProgress.style.width = 0;
  } else if (newPos >= progressMusic.offsetWidth) {
    currentProgress.style.width = 100 + '%';
  }
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
    music.currentTime = music.duration * clickPercent(event);
    music.addEventListener('timeupdate', timeUpdate);
    console.log();
    
  }
  onHold = false;
}
// Toggle Play/Pause button
playButton.addEventListener('click', clickPlay);
// Change the position of slider base on music time
music.addEventListener('timeupdate', timeUpdate);
// Make progressbar clickable
progressMusic.addEventListener('click', function changeMusicDuration(event) {
  moveSlider(event);
  music.currentTime = music.duration * clickPercent(event);
});
// Make slider draggable
slider.addEventListener('mousedown', mouseDown);
window.addEventListener('mouseup', mouseUp);
