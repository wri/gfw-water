import babelPolyfill from 'babel-polyfill';
// import {arcgisConfig} from 'js/config';
import LayerModal from 'components/Modals/LayerModal';
import Map from 'components/Map';
import React from 'react';

if (!babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

// Set up globals
window.app = {
  debugEnabled: true,
  debug: function (message) {
    if (this.debugEnabled) {
      var print = typeof message === 'string' ? console.log : console.dir;
      print.apply(console, [message]);
    }
  }
};

// Shim for rAF with timeout for callback
window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) { window.setTimeout(callback, 1000 / 60); };
})();

// let loadCSS = (url) => {
//   var sheet = document.createElement('link');
//   sheet.rel = 'stylesheet';
//   sheet.type = 'text/css';
//   sheet.href = url;
//   requestAnimationFrame(function () { document.getElementsByTagName('head')[0].appendChild(sheet); });
// };

// let lazyloadAssets = () => {
  // app.debug('main >>> lazyloadAssets');
  // This was causing issues so leave this out unless we get bad pagespeed scores
  // loadCSS(arcgisConfig.css);
// };

let configureApp = () => {
  app.debug('main >>> configureApp');
};

let initializeApp = () => {
  app.debug('main >>> initializeApp');
  React.render(<Map />, document.getElementById('root'));
  React.render(<LayerModal />, document.getElementById('layer-modal'));
};

// lazyloadAssets();
configureApp();
initializeApp();
