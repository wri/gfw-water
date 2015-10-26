import esriRequest from 'esri/request';
import Query from 'esri/tasks/query';
import Deferred from 'dojo/Deferred';
import KEYS from 'js/constants';

const request = {

  /**
  * @param {string} url - Url for an esri map service
  * @param {array} layerIds - An array of layer ids
  * @return {Deferred} deferred - A promise, will return either an array of layerInfos or an empty array
  */
  getLegendInfos: (url, layerIds) => {
    let deferred = new Deferred();

    esriRequest({
      url: `${url}/legend`,
      handleAs: 'json',
      callbackParamName: 'callback',
      content: { f: 'json' }
    }).then(res => {
      if (res && res.layers && res.layers.length > 0) {
        let layers = res.layers.filter(layer => layerIds.indexOf(layer.layerId) > -1);
        let legendInfos = layers.length === 1 ? layers[0].legend : layers.map(layer => layer.legend);
        deferred.resolve(legendInfos || []);
      }
    }, err => {
      console.error(err);
      deferred.resolve([]);
    });

    return deferred;
  },

  /**
  * @param {Point} geometry - Esri Point geometry to use as a query for a feature on the watershed service
  * @return {Deferred} deferred
  */
  getWatershedByGeometry: geometry => {
    let layer = app.map.getLayer(KEYS.watershed);
    let deferred = new Deferred();
    let query = new Query();

    query.geometry = geometry;

    if (layer) {
      layer.queryFeatures(query, featureSet => {
        deferred.resolve(featureSet.features[0]);
      }, deferred.reject);
    } else {
      deferred.reject(false);
    }

    return deferred;
  }

};

export {request as default};
