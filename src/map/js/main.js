import LayerModal from 'components/Modals/LayerModal';
import ShareModal from 'components/Modals/ShareModal';
import BasicModal from 'components/Modals/BasicModal';
import AlertsModal from 'components/Modals/AlertsModal';
import CanopyModal from 'components/Modals/CanopyModal';
import HistoricLossModal from 'components/Modals/HistoricLossModal';
import {assetUrls, proxyRules, corsServers} from 'js/config';
import {loadCSS, loadJS} from 'utils/loaders';
import urlUtils from 'esri/urlUtils';
import esriConfig from 'esri/config';
import Map from 'components/Map';
import ReactDOM from 'react-dom';
import React from 'react';

// import GeoProcessor from 'esri/tasks/Geoprocessor';
// import SR from 'esri/SpatialReference';

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
  loadCSS(assetUrls.ionCSS);
  loadCSS(assetUrls.ionSkinCSS);
  loadJS(assetUrls.highcharts);
  loadJS(assetUrls.highchartsMore);
};

let configureApp = () => {
  brApp.debug('main >>> configureApp');
  corsServers.forEach((server) => { esriConfig.defaults.io.corsEnabledServers.push(server); });
  urlUtils.addProxyRule(proxyRules.hydro);
  urlUtils.addProxyRule(proxyRules.featureServer);
};

let initializeApp = () => {
  brApp.debug('main >>> initializeApp');
  ReactDOM.render(<Map />, document.getElementById('root'));
  ReactDOM.render(<LayerModal />, document.getElementById('layer-modal'));
  ReactDOM.render(<ShareModal />, document.getElementById('share-modal'));
  ReactDOM.render(<BasicModal />, document.getElementById('basic-modal'));
  ReactDOM.render(<AlertsModal />, document.getElementById('alerts-modal'));
  ReactDOM.render(<CanopyModal />, document.getElementById('canopy-modal'));
  ReactDOM.render(<HistoricLossModal />, document.getElementById('historic-loss-modal'));
};

configureApp();
initializeApp();
lazyloadAssets();
