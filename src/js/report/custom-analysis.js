import Histogram from 'js/compute-histogram';
import {analysisConfig} from 'js/config';
import esriRequest from 'esri/request';
import Deferred from 'dojo/Deferred';
import KEYS from 'js/constants';

/**
* Simple Query Wrapper
* @param {string} url - Map Service Url
* @param {object} content - Request payload
* @param {esriGeometryPolygon} - geometry
* @return {deferred}
*/
const esriQuery = (url, content, geometry) => {

  // Stringify some content
  if (geometry) { content.geometry = JSON.stringify(geometry); }

  // Set some defaults
  content.geometryType = content.geometryType || 'esriGeometryPolygon';
  content.returnGeometry = content.returnGeometry || false;
  content.where = content.where || '1 = 1';
  content.f = content.f || 'json';

  return esriRequest({
    callbackParamName: 'callback',
    url: `${url}/query`,
    content: content,
    handleAs: 'json',
    timeout: 30000
  }, { usePost: true });
};

/**
* @param {esriGeometryPolygon} - geometry - Valid Esri Polygon to analyze
* @param {number} - canopyDensity - Value between 0 - 100, chosen by user in the map
* @return {deferred} promise
*/
const customAnalysis = (geometry, canopyDensity) => {
  let promise = new Deferred();

  console.log('Canopy Density', canopyDensity);

  // Wetlands Analysis
  Histogram.getWithMosaic(analysisConfig[KEYS.WETLAND], geometry).then(function (res) {
    console.log('Wetlands', res);
  });

  // Tree Cover Density Analysis
  Histogram.getWithMosaic(analysisConfig[KEYS.TCD], geometry).then(function (res) {
    console.log('Tree Cover Density', res);
  });

  // Major Dams Analysis
  let majorDamsConfig = analysisConfig[KEYS.DAMS];
  esriQuery(majorDamsConfig.url, majorDamsConfig.content, geometry).then(function (res) {
    console.log('Major Dams', res.objectIds);
  });

  // Potential Tree Cover
  Histogram.getWithMosaic(analysisConfig[KEYS.PTC], geometry).then(function (res) {
    console.log('Potential Tree Cover', res);
  });

  // Water Intake Locations
  let waterIntakeConfig = analysisConfig[KEYS.WATER];
  esriQuery(waterIntakeConfig.url, waterIntakeConfig.content, geometry).then(function (res) {
    console.log('Water Intake Locations', res.objectIds);
  });

  // Land Cover
  Histogram.getWithMosaic(analysisConfig[KEYS.LC], geometry).then(function (res) {
    console.log('Land Cover', res);
  });

  // Tree Cover Loss
  Histogram.getWithRasterFuncAndDensity(canopyDensity, geometry).then(function (res) {
    console.log('Tree Cover Loss', res);
  });

  promise.resolve();
  return promise;
};

export { customAnalysis as default };
