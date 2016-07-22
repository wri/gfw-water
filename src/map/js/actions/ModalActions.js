import {layerInformation, layersConfig, metadataUrl} from 'js/config';
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



    //TODO: Add all this below back in once we have styled the layer modal properly with all the data we need
    urlUtils.addProxyRule({
      urlPrefix: 'http://api.globalforestwatch.org',
      proxyUrl: 'http://water-staging.globalforestwatch.org/proxy/proxy.php'
      // proxyUrl: '//localhost/gfw-water/www/proxy/proxy.php'
    });

    //http://water-staging.globalforestwatch.org

    esriConfig.defaults.io.corsEnabledServers.push('api.globalforestwatch.org');
    esriConfig.defaults.io.corsEnabledServers.push('wri-gfw-water.herokuapp.com');
    esriConfig.defaults.io.corsEnabledServers.push('water-staging.globalforestwatch.org');

    // console.log(metadataIds);
    // console.log(layersConfig);

    let metadataId = layersConfig.filter((l) => l.id === layerId)[0].metadataId;
    console.log(metadataId);

    esriRequest({
      url: metadataUrl + metadataId,
      // url: 'http://api.globalforestwatch.org/metadata/noaa18_fires',
      handleAs: 'json',
      callbackParamName: 'callback'
    }, {
      usePost: true
    }).then(res => {
      this.dispatch(res);
      domClass.remove('layer-modal', 'hidden');
    }, err => {
      let emptyObj = {};
      let layerInfo = layerInformation[layerId] || emptyObj;
      this.dispatch(layerInfo);
      if (layerInfo !== emptyObj) {
        domClass.remove('layer-modal', 'hidden');
      }
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

  showAboutModal (card) {
    brApp.debug('ModalActions >>> showAboutModal');
    this.dispatch(card);
    domClass.remove('about-modal', 'hidden');
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
