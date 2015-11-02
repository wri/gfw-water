import babelPolyfill from 'babel-polyfill';

if (!babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

// Init the carousel
$('.home-slider').slick({
  lazyLoad: 'ondemand',
  pauseOnHover: false,
  autoplaySpeed: 4500,
  autoplay: true,
  arrows: false,
  fade: true,
  dots: true
});
