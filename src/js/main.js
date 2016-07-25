import babelPolyfill from 'babel-polyfill';
import config from 'js/config';

if (!babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

//- Init the carousel
$('.home-slider').slick(config.carouselParams);

//- Remove the hidden classes from the slides, they are just there on load while we wait
//- for the header-footer script to load resources
$('#bottom-slider.invisible').removeClass('invisible');

$('.switch-button').click(function () {
  $('.switch-button').css('background-color', '#e9e8e4');
});

$('.switch-slide1').click(function () {
  $(this).css('background-color', '#476685');
  $('.bottom-slide1').removeClass('invisible');
  $('.bottom-slide2').addClass('invisible');
  $('.bottom-slide3').addClass('invisible');
});

$('.switch-slide2').click(function () {
  $(this).css('background-color', '#476685');
  $('.bottom-slide1').addClass('invisible');
  $('.bottom-slide2').removeClass('invisible');
  $('.bottom-slide3').addClass('invisible');
});

$('.switch-slide3').click(function () {
  $(this).css('background-color', '#476685');
  $('.bottom-slide1').addClass('invisible');
  $('.bottom-slide2').addClass('invisible');
  $('.bottom-slide3').removeClass('invisible');
});
