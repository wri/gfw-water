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

/**
* Helper function to calculate slope for a linear regression line based on knownX's and knownY's
* using the least squares method, similar to how excel and google implement SLOPE in spreadsheet
* Formula taken from https://www.easycalculation.com/analytical/learn-least-square-regression.php
* @param {array} - knownXs - Known X Values
* @param {array} - knownYs - Known Y Values
* @return {number} - slope
*/
const calculateSlope = (knownXs, knownYs) => {
  let X_SQUARED = [],
      XY = [],
      leastSquareSlope,
      ΣXY, ΣXX,
      ΣX, ΣY;

  knownXs.forEach(function (val, index) {
    XY.push(val * knownYs[index]);
    X_SQUARED.push(Math.pow(val, 2));
  });

  ΣX = knownXs.reduce(function (a, b) { return a + b; });
  ΣY = knownYs.reduce(function (a, b) { return a + b; });
  ΣXY = XY.reduce(function (a, b) { return a + b; });
  ΣXX = X_SQUARED.reduce(function (a, b) { return a + b; });

  leastSquareSlope = ((knownXs.length * ΣXY) - (ΣX * ΣY)) / ((knownXs.length * ΣXX) - (Math.pow(ΣX, 2)));
  return leastSquareSlope;
};

export default {
  /**
  * @param {array} histograms - histograms response from Image Server
  * @return {object} attributes - object with correct field set to value or 0
  */
  formatWetlands: (histograms) => {
    let config = analysisConfig[KEYS.WETLAND];
    // Parse the counts array
    let counts = getCounts(histograms);
    let attributes = {};
    // Grab the second value, the first is nulls, the second is the one we want
    attributes[config.field] = counts[1] || 0;
    return attributes;
  },

  /**
  * @param {array} histograms - histograms response from Image Server
  * @param {number} canopyDensity - Tree Cover Density Canopy Setting
  * @return {object} attributes - object with correct field set to value or 0
  */
  formatTreeCoverDensity: (histograms, canopyDensity) => {
    let config = analysisConfig[KEYS.TCD];
    // Parse the counts array
    let counts = getCounts(histograms);
    let attributes = {};
    console.log(config.field(canopyDensity));
    attributes[config.field(canopyDensity)] = counts.slice(1).reduce((a, b) => a + b);
    return attributes;
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
  * @return {object} attributes - object with correct field set to value or 0
  */
  formatPotentialTreeCover: (histograms) => {
    let config = analysisConfig[KEYS.PTC];
    // Parse the counts array
    let counts = getCounts(histograms);
    let attributes = {};
    //- Value to save is the sum of the values in counts from indices 1 - 14
    attributes[config.field] = counts.slice(1).reduce((a, b) => a + b);
    return attributes;
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
  * @param {number} canopyDensity - Tree Cover Density Canopy Setting
  * @return {object} attributes - object with correct field set to value or 0
  */
  formatTreeCoverLoss: (histograms, canopyDensity) => {
    let config = analysisConfig[KEYS.TCL];
    // Parse the counts array
    let counts = getCounts(histograms);
    let attributes = {};
    let index = 1;
    let sum = 0;
    let xs = [];
    let ys = [];
    let currentValue;
    //- Save the individual values for the TCL bar chart, indices 1 - 14 represents 2001 - 2014
    //- Histograms from image service drop trailing 0's, so terminator must be config.fieldMax and not array length
    for(index; index <= config.fieldMax; index++) {
      currentValue = counts[index] || 0;
      // Format is tl_g_${density}_${two digit index}_ha
      attributes[config.field(canopyDensity, index)] = currentValue;
      sum += currentValue;
      // Store xs and ys for slope calculation
      ys.push(currentValue);
      xs.push(index);
    }
    //- Save the sum of the values of counts from indices 1 - 14 in all field
    attributes[config.allField(canopyDensity)] = sum;
    //- Save the slope as well
    attributes[config.slopeField(canopyDensity)] = Math.round(calculateSlope(xs, ys));
    return attributes;
  }

};
