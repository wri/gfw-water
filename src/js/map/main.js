import babelPolyfill from 'babel-polyfill';
import LayerModal from 'components/Modals/LayerModal';
import ShareModal from 'components/Modals/ShareModal';
import AlertsModal from 'components/Modals/AlertsModal';
import CanopyModal from 'components/Modals/CanopyModal';
import {assetUrls} from 'js/config';
import Map from 'components/Map';
import ReactDOM from 'react-dom';
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

let loadCSS = (url) => {
  var sheet = document.createElement('link');
  sheet.rel = 'stylesheet';
  sheet.type = 'text/css';
  sheet.href = url;
  requestAnimationFrame(function () { document.getElementsByTagName('head')[0].appendChild(sheet); });
};

// let loadJS = (url) => {
//   var script = document.createElement('script');
//   script.src = url;
//   script.async = true;
//   requestAnimationFrame(function () { document.getElementsByTagName('head')[0].appendChild(script); });
// };

let lazyloadAssets = () => {
  app.debug('main >>> lazyloadAssets');
  // This was causing issues so leave this out unless we get bad pagespeed scores
  loadCSS(assetUrls.ionCSS);
  loadCSS(assetUrls.ionSkinCSS);
  //loadJS(assetUrls.ionJS);
};

let configureApp = () => {
  app.debug('main >>> configureApp');
};

let initializeApp = () => {
  app.debug('main >>> initializeApp');
  ReactDOM.render(<Map />, document.getElementById('root'));
  ReactDOM.render(<LayerModal />, document.getElementById('layer-modal'));
  ReactDOM.render(<ShareModal />, document.getElementById('share-modal'));
  ReactDOM.render(<AlertsModal />, document.getElementById('alerts-modal'));
  ReactDOM.render(<CanopyModal />, document.getElementById('canopy-modal'));
};

lazyloadAssets();
configureApp();
initializeApp();
