import babelPolyfill from 'babel-polyfill';
import {loadCSS, loadJS} from 'utils/loaders';
import config from 'js/config';
import reportMaps from 'js/report-maps';
// import reportCharts from 'js/report-charts';

if (!babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

// Set up globals
window.brApp = {
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

let lazyloadAssets = () => {
  brApp.debug('main >>> lazyloadAssets');
  // This was causing issues so leave this out unless we get bad pagespeed scores
  loadCSS(config.assetUrls.ionCSS);
  loadCSS(config.assetUrls.ionSkinCSS);
  loadJS(config.assetUrls.highcharts);
  loadJS(config.assetUrls.highchartsMore);
};

let configureApp = () => {
  brApp.debug('main >>> configureApp');
};

configureApp();
lazyloadAssets();
console.log('calling report maps, config', config);
reportMaps.printAll(config);
