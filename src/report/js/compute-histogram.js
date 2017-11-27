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
  content.f = content.f || 'json';

  return esriRequest({
    url: `${url}/computeHistograms`,
    callbackParamName: 'callback',
    content: content,
    handleAs: 'json',
    timeout: 150000
  }, { usePost: true });
};

/**
* Compute Statistics Histogram Wrapper
* @param {string} url - Image Service Url
* @param {object} content - Payload for the request
* @return {deferred}
*/
const computeStatisticsHistograms = (url, content) => {
  // Make sure certain params are stringified
  if (content.geometry) { content.geometry = JSON.stringify(content.geometry); }
  if (content.renderingRule) { content.renderingRule = JSON.stringify(content.renderingRule); }
  if (content.mosaicRule) { content.mosaicRule = JSON.stringify(content.mosaicRule); }
  // Set some defaults
  content.geometryType = content.geometryType || 'esriGeometryPolygon';
  content.pixelSize = content.pixelSize || 100;
  content.f = content.f || 'json';

  console.log('content', content);

  return esriRequest({
    url: `${url}/computeStatisticsHistograms`,
    callbackParamName: 'callback',
    content: content,
    handleAs: 'json',
    timeout: 150000
  }, { usePost: true });
};


const query = {

  getFireRaster: (url, geometry) => {
    return computeHistogram(url, {
      geometry
    });
  },

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
      geometry: geometry,
      pixelSize: 100
    });
  },

  /**
  * This analysis is only available on 10.4
  * This method signature may change but it is only temporary since it is using 10.4 Preview server
  */
  getStatisitcs: (url, geometry, pixelSize) => {
    console.log('getStatisitcs', geometry);
    return computeStatisticsHistograms(url, {
      geometry: geometry,
      pixelSize: pixelSize
    });
  }

};

export { query as default };
