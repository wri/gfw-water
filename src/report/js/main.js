import ShareModal from 'components/Modals/ShareModal';
import BasicModal from 'components/Modals/BasicModal';
import WaterStressLegend from 'components/LayerPanel/WaterStressLegend';
import SedimentLegend from 'components/LayerPanel/SedimentLegend';
import {modalActions} from 'actions/ModalActions';
import babelPolyfill from 'babel-polyfill';
import {loadCSS, loadJS} from 'utils/loaders';
import config from 'report/config';
import reportMaps from 'report/report-maps';
import urlUtils from 'esri/urlUtils';
import esriConfig from 'esri/config';
import ReactDOM from 'react-dom';
import React from 'react';
import csvExport from 'report/csv-export';
import {analysisPanelText as text} from 'js/config';
// import reportCharts from 'js/report-charts';

if (!babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

// Set up globals
window.brApp = {
  debugEnabled: true,
  highchartsLoaded: false,
  highchartsPromise: false,
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
  brApp.highchartsPromise = loadJS(config.assetUrls.highchartsExport);
  brApp.highchartsPromise.then(() => {
    brApp.highchartsLoaded = true;
  }, console.error);
};

let configureApp = () => {
  brApp.debug('main >>> configureApp');
  urlUtils.addProxyRule(config.proxy.featureServer);
  config.corsEnabledServers.forEach(server => {
    esriConfig.defaults.io.corsEnabledServers.push(server);
  });
};

const attachEvents = () => {
  //- Listener for share modal
  document.getElementById('share-icon').addEventListener('click', () => {
    let queryString = document.location.search.slice(1);
    modalActions.showShareModal(queryString);
  });
  document.getElementById('share-icon-bottom').addEventListener('click', () => {
    let queryString = document.location.search.slice(1);
    modalActions.showShareModal(queryString);
  });
  //- Listener for Watershed Summary Info Modal
  document.getElementById('watershed-info-button').addEventListener('click', () => {
    modalActions.showBasicModal(text.watershedSummeryInfo, text.watershedSummeryInfoDescription);
  });
  document.getElementById('major-dams-info-button').addEventListener('click', () => {
    modalActions.showBasicModal(text.majorDamsSummeryInfo, text.majorDamsSummeryInfoDescription);
  });
  document.getElementById('water-intakes-info-button').addEventListener('click', () => {
    modalActions.showBasicModal(text.waterIntakeSummeryInfo, text.waterIntakeSummeryInfoDescription);
  });
  // Print button click.
  document.getElementById('print-icon').addEventListener('click', () => window.print());
  document.getElementById('print-icon-bottom').addEventListener('click', () => window.print());
  // CSV export.
  document.getElementById('csv-export-icon').addEventListener('click', () => {
    let watershed = reportMaps.currentWatershed();
    console.log('watershed', watershed);
    csvExport(watershed);
  });
  document.getElementById('csv-export-icon-bottom').addEventListener('click', () => {
    let watershed = reportMaps.currentWatershed();
    console.log('watershed', watershed);
    csvExport(watershed);
  });
};

configureApp();
lazyloadAssets();
attachEvents();
reportMaps.printAll(config);
ReactDOM.render(<WaterStressLegend url='http://gis.wri.org/arcgis/rest/services/Aqueduct/aqueduct_global_2014/MapServer' layerIds={[1]} />, document.getElementById('waterStressReport'));
ReactDOM.render(<SedimentLegend url='http://gis-gfw.wri.org/arcgis/rest/services/hydrology/MapServer' layerIds={[4]} />, document.getElementById('sedimentReport'));
ReactDOM.render(<ShareModal />, document.getElementById('share-modal'));
ReactDOM.render(<BasicModal />, document.getElementById('basic-modal'));
