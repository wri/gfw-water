import esriRequest from 'esri/request';
import Deferred from 'dojo/Deferred';

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
      content: {
        dynamicLayers: JSON.stringify(layerIds),
        f: 'json'
      }
    }).then(res => {
      if (res && res.layers && res.layers.length > 0) {
        let legendInfos = res.layers[layerIds[0]].legend;
        deferred.resolve(legendInfos || []);
      }
    }, err => {
      console.error(err);
      deferred.resolve([]);
    });

    return deferred;
  }

};

export {request as default};
