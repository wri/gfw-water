import {analysisConfig} from 'report/config';
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
  content.pixelSize = content.pixelSize || 100;
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

  getWithMosaic: (rasterId, geometry, pixelSize) => {
    return computeHistogram(analysisConfig.imageService, {
      mosaicRule: analysisConfig.mosaicRule(rasterId),
      geometry: geometry,
      pixelSize: pixelSize || 100
    });
  },

  getWithRasterFuncAndDensity: (rasterId, density, geometry) => {
    return computeHistogram(analysisConfig.imageService, {
      renderingRule: analysisConfig.rasterRemapForTCD(rasterId, density),
      geometry: geometry
    });
  }

};

export { query as default };
