import babelPolyfill from 'babel-polyfill';
import config from 'js/config';

if (!babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

//- Init the carousel
$('.home-slider').slick(config.carouselParams);

//- Remove the hidden classes from the slides, they are just there on load while we wait
//- for the header-footer script to load resources
$('.slide.hidden').removeClass('hidden');
