import Formatters from 'js/custom-formatters';
import Histogram from 'js/compute-histogram';
import {analysisConfig} from 'js/config';
import esriRequest from 'esri/request';
import Deferred from 'dojo/Deferred';
import lang from 'dojo/_base/lang';
import all from 'dojo/promise/all';
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
  let waterIntakeConfig = analysisConfig[KEYS.WATER];
  let majorDamsConfig = analysisConfig[KEYS.DAMS];
  let treeDensityConfig = analysisConfig[KEYS.TCD];
  let treeLossConfig = analysisConfig[KEYS.TCL];
  let promise = new Deferred();
  let promises = {};

  // Start the promises and give them an id, then pass them to all
  // Major Dams Analysis
  promises[KEYS.DAMS] = esriQuery(majorDamsConfig.url, majorDamsConfig.content, geometry);
  // Water Intake Locations
  promises[KEYS.WATER] = esriQuery(waterIntakeConfig.url, waterIntakeConfig.content, geometry);
  // Wetlands Analysis
  promises[KEYS.WETLAND] = Histogram.getWithMosaic(analysisConfig[KEYS.WETLAND], geometry);
  // Potential Tree Cover
  promises[KEYS.PTC] = Histogram.getWithMosaic(analysisConfig[KEYS.PTC], geometry);
  // Land Cover
  promises[KEYS.LC] = Histogram.getWithMosaic(analysisConfig[KEYS.LC], geometry);
  // Tree Cover Density Analysis
  promises[KEYS.TCD] = Histogram.getWithRasterFuncAndDensity(treeDensityConfig.rasterId, canopyDensity, geometry);
  // Tree Cover Loss
  promises[KEYS.TCL] = Histogram.getWithRasterFuncAndDensity(treeLossConfig.rasterId, canopyDensity, geometry);

  all(promises).then(function (response) {
    let attributes = {};
    // Mixin all the attributes
    lang.mixin(attributes, Formatters.formatWetlands(response[KEYS.WETLAND].histograms));
    lang.mixin(attributes, Formatters.formatTreeCoverDensity(response[KEYS.TCD].histograms, canopyDensity));
    lang.mixin(attributes, Formatters.formatMajorDams(response[KEYS.DAMS].histograms));
    lang.mixin(attributes, Formatters.formatPotentialTreeCover(response[KEYS.PTC].histograms));
    lang.mixin(attributes, Formatters.formatWaterIntake(response[KEYS.WATER].histograms));
    lang.mixin(attributes, Formatters.formatLandCover(response[KEYS.LC].histograms));
    lang.mixin(attributes, Formatters.formatTreeCoverLoss(response[KEYS.TCL].histograms, canopyDensity));
    // TODO: REPLACE WITH ACTUAL RISK CALCULATION
    let randomValue = Math.ceil(Math.random() * 4);
    attributes.rs_tl_c = randomValue;
    attributes.rs_sed_c = randomValue;
    attributes.rs_pf_c = randomValue;
    attributes.rs_fire_c = randomValue;

    promise.resolve(attributes);
  });

  return promise;
};

export { customAnalysis as default };
