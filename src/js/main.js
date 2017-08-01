let $ = require('jquery')
let slick = require('slick-carousel');
$(document).ready(() => {
  $('.nav-trigger').click(function(){
      $(this).toggleClass('active');
      $('.overlay .main-nav').toggleClass('expend');
  });
  $('.main-banner').slick({
    autoplay: false,
    arrows: false,
    dots: true
  });
});
