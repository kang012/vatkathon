var prevScrollPos = window.pageYOffset;
var bigNav = document.getElementById('big-nav');
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
