import Formatters from 'report/custom-formatters';
import Histogram from 'report/compute-histogram';
import {analysisConfig} from 'report/config';
import esriRequest from 'esri/request';
import Deferred from 'dojo/Deferred';
import lang from 'dojo/_base/lang';
import all from 'dojo/promise/all';
import KEYS from 'report/constants';

/**
* When one promise in dojo/promise/all fails, the whole thing fails
* this version will never fail, instead returns an object with the data
* or an error message so If one fails, I can still use results of the ones
* that didnt
* @param {object} promiseDictionary
* @return {promise}
*/
const betterAll = (promiseDictionary) => {
  let promise = new Deferred();
  let results = {};
  let count = 0;

  const savePromiseAt = (promiseKey) => {
    promiseDictionary[promiseKey].then(function (response) {
      results[promiseKey] = { data: response };
      --count;
      if (count === 0) { promise.resolve(results); }
    }, function (error) {
      results[promiseKey] = { error: error };
      --count;
      if (count === 0) { promise.resolve(results); }
    });
  };

  for (var key in promiseDictionary) {
    if (promiseDictionary.hasOwnProperty(key)) {
      ++count;
      savePromiseAt(key);
    }
  }

  return promise;
};

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
* TODO: Remove all the commented out analysis once testing is done, it is being
* done in the map and saved in the feature service so it does not to be included here
*************************************************************************************
* This function performs all the custom analysis at once, it is used for the report
* @param {esriGeometryPolygon} geometry - Valid Esri Polygon to analyze
* @param {number} area - Area of the provided polygon
* @param {number} canopyDensity - Value between 0 - 100, chosen by user in the map
* @return {deferred} promise
*/
export const performCustomAnalysis = (geometry, area, canopyDensity) => {
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
  promises[KEYS.WETLAND] = Histogram.getWithMosaic(analysisConfig[KEYS.WETLAND].rasterId, geometry);
  // Potential Tree Cover
  promises[KEYS.PTC] = Histogram.getWithMosaic(analysisConfig[KEYS.PTC].rasterId, geometry);
  // Land Cover
  promises[KEYS.LC] = Histogram.getWithMosaic(analysisConfig[KEYS.LC].rasterId, geometry);
  // Tree Cover Density Analysis
  promises[KEYS.TCD] = Histogram.getWithMosaic(treeDensityConfig.rasterId, geometry);
  // Tree Cover Loss
  promises[KEYS.TCL] = Histogram.getWithRasterFuncAndDensity(treeLossConfig.rasterId, canopyDensity, geometry);
  //- Risk Analysis Queries below
  // Fires for Risk Analysis
  let firesRiskConfig = analysisConfig[KEYS.R_FIRES];
  promises[KEYS.R_FIRES] = Histogram.getWithMosaic(firesRiskConfig.rasterId, geometry, firesRiskConfig.pixelSize);
  // Erosion for Risk Analysis
  // let erosionConfig = analysisConfig[KEYS.R_EROSION];
  // promises[KEYS.R_EROSION] = Histogram.getStatisitcs(erosionConfig.url, geometry, erosionConfig.pixelSize);
  // // Recent TCL for Risk Analysis
  // promises[KEYS.R_TCL] = Histogram.getWithMosaic(analysisConfig[KEYS.R_TCL].aridAreaRasterId, geometry);
  // // Historic TCL for Risk Analysis
  // promises[KEYS.R_HTCL] = Histogram.getWithMosaic(analysisConfig[KEYS.R_HTCL].aridAreaRasterId, geometry);

  // If Density is 30, these calls dont need to be done, if its not 30, then they need to get these values
  // since they are used in the risk calculations
  // if (+canopyDensity !== 30) {
  //   promises[KEYS.TCD_30] = Histogram.getWithRasterFuncAndDensity(treeDensityConfig.rasterId, 30, geometry);
  //   promises[KEYS.TCL_30] = Histogram.getWithRasterFuncAndDensity(treeLossConfig.rasterId, 30, geometry);
  // }

  all(promises).then(function (response) {
    let attributes = {},
        firesRiskResponse;
        // tl_g30_all_ha,
        // tc_g30_ha;
    // Mixin all the attributes for image service calls and queries
    lang.mixin(attributes, Formatters.formatMajorDams(response[KEYS.DAMS]));
    lang.mixin(attributes, Formatters.formatWaterIntake(response[KEYS.WATER]));
    lang.mixin(attributes, Formatters.formatWetlands(response[KEYS.WETLAND]));
    lang.mixin(attributes, Formatters.formatTreeCoverDensity(response[KEYS.TCD], canopyDensity));
    lang.mixin(attributes, Formatters.formatPotentialTreeCover(response[KEYS.PTC]));
    lang.mixin(attributes, Formatters.formatLandCover(response[KEYS.LC]));
    lang.mixin(attributes, Formatters.formatTreeCoverLoss(response[KEYS.TCL], canopyDensity));

    // Mixin the risk analysis
    // if (+canopyDensity !== 30) {
    //   tl_g30_all_ha = Formatters.formatTreeCoverLoss(response[KEYS.TCL_30], 30).tl_g30_all_ha;
    //   tc_g30_ha = Formatters.formatTreeCoverDensity(response[KEYS.TCD_30], 30).tc_g30_ha;
    // } else {
    //   tl_g30_all_ha = attributes.tl_g30_all_ha;
    //   tc_g30_ha = attributes.tc_g30_ha;
    // }

    firesRiskResponse = response[KEYS.R_FIRES];

    lang.mixin(attributes, Formatters.formatAnnualFiresAverage(firesRiskResponse));
    // lang.mixin(attributes, Formatters.formatFiresRisk(firesRiskResponse, area));
    // lang.mixin(attributes, Formatters.formatErosionRisk(response[KEYS.R_EROSION]));
    // lang.mixin(attributes, Formatters.formatTCLRisk(response[KEYS.R_TCL], area, tl_g30_all_ha, tc_g30_ha));
    // lang.mixin(attributes, Formatters.formatHTCLRisk(response[KEYS.R_HTCL], area, tc_g30_ha, attributes.ptc_ha));

    promise.resolve(attributes);
  });

  return promise;
};

/**
* This function is used in the map and performs the risk analysis only for the given geometry
* @param {esriGeometryPolygon} geometry - Valid Esri Polygon to analyze
* @param {number} area - Area of the provided polygon
* @param {number} canopyDensity - Value between 0 - 100, chosen by user in the map,
* @return {deferred} promise
*/
export const performRiskAnalysis = (geometry, area) => {
  let promise = new Deferred();
  let treeLossConfig = analysisConfig[KEYS.TCL];
  let promises = {};

  // These are needed for Tree Cover Loss and Historic Tree Cover Loss risk analysis
  promises[KEYS.TCD_30] = Histogram.getWithMosaic(analysisConfig[KEYS.TCD].rasterId, geometry);
  promises[KEYS.TCL_30] = Histogram.getWithRasterFuncAndDensity(treeLossConfig.rasterId, 30, geometry);
  // Potential Tree Cover -- Needed for Historic Tree Cover Loss Risk Analysis
  promises[KEYS.PTC] = Histogram.getWithMosaic(analysisConfig[KEYS.PTC].rasterId, geometry);
  // Fires for Risk Analysis
  promises[KEYS.R_FIRES] = Histogram.getWithMosaic(analysisConfig[KEYS.R_FIRES].rasterId, geometry, 4308.246486);
  // Erosion for Risk Analysis
  let erosionConfig = analysisConfig[KEYS.R_EROSION];
  promises[KEYS.R_EROSION] = Histogram.getStatisitcs(erosionConfig.url, geometry, erosionConfig.pixelSize);
  // Arid area for Recent & Historic TCL for Risk Analysis
  promises[KEYS.ARID] = Histogram.getWithMosaic(analysisConfig[KEYS.ARID].rasterId, geometry);

  // Results are in the following shape {data: {...}, error: {...}}
  betterAll(promises).then((results) => {
    let attributes = {},
        tl_g30_all_ha,
        tc_g30_ha,
        ptc_ha;

    console.log(results);

    tl_g30_all_ha = Formatters.formatTreeCoverLoss(results[KEYS.TCL_30].data, 30).tl_g30_all_ha;
    tc_g30_ha = Formatters.formatTreeCoverDensity(results[KEYS.TCD_30].data, 30).tc_g30_ha;
    ptc_ha = Formatters.formatPotentialTreeCover(results[KEYS.PTC].data).ptc_ha;

    lang.mixin(attributes, Formatters.formatFiresRisk(results[KEYS.R_FIRES].data, area));
    lang.mixin(attributes, Formatters.formatTCLRisk(results[KEYS.ARID].data, area, tl_g30_all_ha, tc_g30_ha));
    lang.mixin(attributes, Formatters.formatHTCLRisk(results[KEYS.ARID].data, area, tc_g30_ha, ptc_ha));

    if (results[KEYS.R_EROSION].data) {
      lang.mixin(attributes, Formatters.formatErosionRisk(results[KEYS.R_EROSION].data));
    } else {
      attributes[analysisConfig[KEYS.R_EROSION].field] = 10;
    }

    promise.resolve(attributes);

  });

  return promise;
};
