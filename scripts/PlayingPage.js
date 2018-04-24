var prevScrollPos = window.pageYOffset;
var bigNav = document.getElementById('big-nav');
var slider = document.getElementsByClassName('slider');

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

function updatePosition(){

}

function updateAudio(){

}

function changeProgress(){
  
}

slider.addEventListener("mousedown",)


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

