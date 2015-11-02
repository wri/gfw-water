import babelPolyfill from 'babel-polyfill';

if (!babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

// Init the carousel
$('.homeCarousel').slick({
  lazyLoad: 'ondemand',
  autoplaySpeed: 3000,
  autoplay: true,
  arrows: false,
  fade: true,
  dots: true
});
