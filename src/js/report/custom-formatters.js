import {analysisConfig} from 'js/config';
import KEYS from 'js/constants';

/**
* Helper function to grab the counts or return 0
* @param {array} histograms
* @return {array} - array of counts or an empty array
*/
const getCounts = histograms => {
  // Parse the histogram if present and return uf not
  let histogram = histograms.length > 0 ? histograms[0] : 0;
  if (!histogram) { return []; }
  // Grab the counts and return if counts is empty
  let counts = histogram.counts && histogram.counts.length > 0 ? histogram.counts : [];
  return counts;
};

export default {
  /**
  * @param {array} histograms - histograms response from Image Server
  * @return {object} attributes - object with correct field set to value or 0
  */
  formatWetlands: (histograms) => {
    let config = analysisConfig[KEYS.WETLAND];
    // Parse the counts array, return 0 if counts is not an array
    let counts = getCounts(histograms);
    let attributes = {};
    // Grab the second value, the first is nulls, the second is the one we want
    attributes[config.field] = counts[1] || 0;
    return attributes;
  },

  /**
  * @param {array} histograms - histograms response from Image Server
  */
  formatTreeCoverDensity: (histograms) => {

  },

  /**
  * @param {object} response - response from Map Server
  * @return {object} attributes - object with correct field set to value or 0
  */
  formatMajorDams: (response) => {
    let config = analysisConfig[KEYS.DAMS];
    let count = response && response.objectIds && response.objectIds.length;
    let attributes = {};
    attributes[config.field] = count || 0;
    return attributes;
  },

  /**
  * @param {array} histograms - histograms response from Image Server
  */
  formatPotentialTreeCover: (histograms) => {

  },

  /**
  * @param {object} response - response from Map Server
  * @return {object} attributes - object with correct field set to value or 0
  */
  formatWaterIntake: (response) => {
    let config = analysisConfig[KEYS.WATER];
    let count = response && response.objectIds && response.objectIds.length;
    let attributes = {};
    attributes[config.field] = count || 0;
    return attributes;
  },

  /**
  * @param {array} histograms - histograms response from Image Server
  * @return {object} attributes - object with correct fields set to values or 0
  */
  formatLandCover: (histograms) => {
    let config = analysisConfig[KEYS.LC];
    // Parse the counts array
    let counts = getCounts(histograms);
    let attributes = {},
        index = 0;
    //- Fields are in the order of the histogram response but start at index 1 of the histogram
    for (;index < config.fields.length; index++) {
      attributes[config.fields[index]] = counts[index + 1] || 0;
    }
    return attributes;
  },

  /**
  * @param {array} histograms - histograms response from Image Server
  */
  formatTreeCoverLoss: (histograms) => {

  }

};
