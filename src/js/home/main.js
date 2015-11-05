// import babelPolyfill from 'babel-polyfill';
import config from 'js/config';

if (!_babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

// Init the carousel
$('.home-slider').slick(config.carouselParams);
