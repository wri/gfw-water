import {layerInformation} from 'js/config';
import esriRequest from 'esri/request';
import esriConfig from 'esri/config';
import urlUtils from 'esri/urlUtils';
import domClass from 'dojo/dom-class';
import alt from 'js/alt';

class ModalActions {

  showLayerInfo (layerId) {
    brApp.debug('ModalActions >>> showLayerInfo');
    // let emptyObj = {};
    // let layerInfo = layerInformation[layerId] || emptyObj;
    // this.dispatch(layerInfo);
    // if (layerInfo !== emptyObj) {
    //   domClass.remove('layer-modal', 'hidden');
    // }

    urlUtils.addProxyRule({
      urlPrefix: 'http://api.globalforestwatch.org',
      proxyUrl: 'http://wri-gfw-water-staging.herokuapp.com/proxy/proxy.php'
    });

    esriConfig.defaults.io.corsEnabledServers.push('api.globalforestwatch.org');
    esriConfig.defaults.io.corsEnabledServers.push('wri-gfw-water.herokuapp.com');

    // console.log(metadataIds);
    // console.log(layersConfig);

    // let metadataId = layersConfig.filter((l) => l.id === layerId)[0].metadataId;
    // console.log(metadataId);

    esriRequest({
      // url: metadataUrl + metadataId,
      url: 'http://api.globalforestwatch.org/metadata/noaa18_fires',
      handleAs: 'json',
      callbackParamName: 'callback'
    }, {
      usePost: true
    }).then(res => {
      this.dispatch(res);
      domClass.remove('layer-modal', 'hidden');
    }, err => {
      // this.dispatch({});
      // console.log(layerId)
      this.dispatch(layerId); //todo: show config's template based on this layerId
      domClass.remove('layer-modal', 'hidden');
      console.error(err);
    });
  }

  showShareModal (params) {
    brApp.debug('ModalActions >>> showShareModal');
    //TODO: Generate a url from bitly that includes Map Store state, this way we can share params
    let url = document.location.href.split('?')[0];
    this.dispatch(`${url}?${params}`);
    domClass.remove('share-modal', 'hidden');
  }

  showAlertsModal () {
    brApp.debug('ModalActions >>> showAlertsModal');
    domClass.remove('alerts-modal', 'hidden');
  }

  showCanopyModal () {
    brApp.debug('ModalActions >>> showCanopyModal');
    domClass.remove('canopy-modal', 'hidden');
  }

  showBasicModal (title, text) {
    brApp.debug('ModalActions >>> showBasicModal');
    this.dispatch({ title: title, text: text });
    domClass.remove('basic-modal', 'hidden');
  }

  showHistoricLossModal () {
    brApp.debug('ModalActions >>> showHistoricLossModal');
    domClass.remove('historic-loss-modal', 'hidden');
  }

  hideModal (node) {
    brApp.debug('ModalActions >>> hideModal');
    domClass.add(node, 'hidden');
  }

  updateCanopyDensity (newDensity) {
    brApp.debug('ModalActions >>> updateCanopyDensity');
    this.dispatch(newDensity);
  }

  saveLossCookie (options) {
    brApp.debug('ModalActions >>> saveLossCookie');
    this.dispatch(options);
  }

}

export const modalActions = alt.createActions(ModalActions);
