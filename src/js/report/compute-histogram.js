import {analysisConfig} from 'js/config';
import esriRequest from 'esri/request';

/**
* Compute Histogram Wrapper
* @param {string} url - Image Service Url
* @param {object} content - Payload for the request
* @return {deferred}
*/
const computeHistogram = (url, content) => {

  // Make sure certain params are stringified
  if (content.geometry) { content.geometry = JSON.stringify(content.geometry); }
  if (content.renderingRule) { content.renderingRule = JSON.stringify(content.renderingRule); }
  if (content.mosaicRule) { content.mosaicRule = JSON.stringify(content.mosaicRule); }
  // Set some defaults
  content.geometryType = content.geometryType || 'esriGeometryPolygon';
  content.f = content.f || 'json';

  return esriRequest({
    url: `${url}/computeHistograms`,
    callbackParamName: 'callback',
    content: content,
    handleAs: 'json',
    timeout: 30000
  }, { usePost: true });
};


const query = {

  getWithMosaic: (config, geometry) => {
    return computeHistogram(analysisConfig.imageService, {
      mosaicRule: analysisConfig.mosaicRule(config.rasterId),
      geometry: geometry
    });
  },

  getWithRasterFuncAndDensity: (density, geometry) => {
    return computeHistogram(analysisConfig.imageService, {
      rasterFunction: analysisConfig.rasterRemapForTCD(density),
      geometry: geometry
    });
  }

};

export { query as default };
