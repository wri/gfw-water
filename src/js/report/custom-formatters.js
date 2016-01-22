import {analysisConfig, riskGrader} from 'report/config';
import KEYS from 'report/constants';

/**
* Helper function to grab the counts or return empty array
* @param {array} histograms
* @return {array} - array of counts or an empty array
*/
const getCounts = histograms => {
  // Parse the histogram if present and return if not
  let histogram = histograms.length > 0 ? histograms[0] : 0;
  if (!histogram) { return []; }
  // Grab the counts and return if counts is empty
  let counts = histogram.counts && histogram.counts.length > 0 ? histogram.counts : [];
  return counts;
};

/**
* Helper function to grab the statistics or return empty array
* @param {array} statistics
* @return {object} - statistics object
*/
const getStatisitcs = statistics => {
  return statistics.length > 0 ? statistics[0] : {};
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
  * @param {object} response - response from Image Server
  * @param {array} response.histograms - histograms from the response
  * @return {object} attributes - object with correct field set to value or 0
  */
  formatWetlands: (response) => {
    let config = analysisConfig[KEYS.WETLAND];
    // Parse the counts array
    let counts = getCounts(response.histograms);
    let attributes = {};
    // Grab the second value, the first is nulls, the second is the one we want
    attributes[config.field] = counts[1] || 0;
    return attributes;
  },

  /**
  * @param {object} response - response from Image Server
  * @param {array} response.histograms - histograms from the response
  * @param {number} canopyDensity - Tree Cover Density Canopy Setting
  * @return {object} attributes - object with correct field set to value or 0
  */
  formatTreeCoverDensity: (response, canopyDensity) => {
    let config = analysisConfig[KEYS.TCD];
    // Parse the counts array
    let counts = getCounts(response.histograms);
    let attributes = {};
    let startIndex = config.valueIndex[canopyDensity];
    attributes[config.field(canopyDensity)] = counts.length ? counts.slice(startIndex).reduce((a, b) => a + b) : 0;
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
  * @param {object} response - response from Image Server
  * @param {array} response.histograms - histograms from the response
  * @return {object} attributes - object with correct field set to value or 0
  */
  formatPotentialTreeCover: (response) => {
    let config = analysisConfig[KEYS.PTC];
    // Parse the counts array
    let counts = getCounts(response.histograms);
    let attributes = {};
    //- Value to save is the sum of the values in counts from indices 1 - 14
    attributes[config.field] = counts.length ? counts.slice(1).reduce((a, b) => a + b) : 0;
    return attributes;
  },

  /**
  * @param {object} response - response from Image Server
  * @param {array} response.histograms - histograms from the response
  * @return {object} attributes - object with correct fields set to values or 0
  */
  formatLandCover: (response) => {
    let config = analysisConfig[KEYS.LC];
    // Parse the counts array
    let counts = getCounts(response.histograms);
    let attributes = {},
        index = 0;
    //- Fields are in the order of the histogram response but start at index 1 of the histogram
    for (;index < config.fields.length; index++) {
      attributes[config.fields[index]] = counts[index + 1] || 0;
    }
    return attributes;
  },

  /**
  * @param {object} response - response from Image Server
  * @param {array} response.histograms - histograms from the response
  * @param {number} canopyDensity - Tree Cover Density Canopy Setting
  * @return {object} attributes - object with correct field set to value or 0
  */
  formatTreeCoverLoss: (response, canopyDensity) => {
    let config = analysisConfig[KEYS.TCL];
    // Parse the counts array
    let counts = getCounts(response.histograms);
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
  },

  /**
  * @param {object} response - response from Image Server
  * @param {array} response.histograms - histograms from the response
  * @return {object} attributes - object with correct field set to value or 0
  */
  formatAnnualFiresAverage: (response) => {
    let config = analysisConfig[KEYS.R_FIRES_AVG];
    // Parse the counts array
    let counts = getCounts(response.histograms);
    let attributes = {};
    //- TODO - ADD COMMENT
    let total = 0;
    counts.forEach((val, index) => { total += val * index; });
    attributes[config.field] = total;
    return attributes;
  },

  /**
  * @param {object} response - response from Image Server
  * @param {array} response.histograms - histograms from the response
  * @return {object} attributes - object with correct field set to value or 0
  */
  formatFiresRisk: (response, area) => {
    let config = analysisConfig[KEYS.R_FIRES];
    let grader = riskGrader[KEYS.R_FIRES];
    // Parse the counts array
    let counts = getCounts(response.histograms);
    let attributes = {};
    //- TODO - ADD COMMENT
    let total = 0;
    counts.forEach((val, index) => { total += val * index; });
    let rawValue = total / area;
    attributes[config.field] = grader(rawValue) || 0;
    return attributes;
  },

  /**
  * @param {object} response - response from Image Server
  * @param {array} response.histograms - histograms from the response
  * @param {number} area - Area in hectares of the polygon were analyzing
  * @return {object} attributes - object with correct field set to value or 0
  */
  formatErosionRisk: (response) => {
    let config = analysisConfig[KEYS.R_EROSION];
    let grader = riskGrader[KEYS.R_EROSION];
    // Parse the statistics object
    let statistics = getStatisitcs(response.statistics);
    let attributes = {};
    attributes[config.field] = grader(statistics.mean || 0);
    return attributes;
  },

  /**
  * @param {object} response - response from Image Server
  * @param {array} response.histograms - histograms from the response
  * @param {number} area - Area in hectares of the polygon were analyzing
  * @param {number} tlAllValue - Potential Tree Cover Value with 30% density - from field tl_g30_all_ha
  * @param {number} tcValue - Potential Tree Cover Value with 30% density - from field tc_g30_ha
  * @return {object} attributes - object with correct field set to value or 0
  */
  formatTCLRisk: (response, area, tlAllValue, tcValue) => {
    let config = analysisConfig[KEYS.R_TCL];
    let grader = riskGrader[KEYS.R_TCL];
    let rawValue = 10;
    let attributes = {};
    // Parse the counts array
    let counts = getCounts(response.histograms);
    let aridArea = counts[1] || 0;

    if ((aridArea / area) > 0.80) {
      rawValue = 10;
    } else if ((tcValue / area) < 0.1) {
      rawValue = 10;
    } else {
      rawValue = tlAllValue / tcValue;
    }

    attributes[config.field] = grader(rawValue) || 0;
    return attributes;
  },

  /**
  * @param {object} response - response from Image Server
  * @param {array} response.histograms - histograms from the response
  * @param {number} area - Area in hectares of the polygon were analyzing
  * @param {number} tcValue - Potential Tree Cover Value with 30% density - from field tc_g30_ha
  * @param {number} ptcValue - Potential Tree Cover Value - from field ptc_ha
  * @return {object} attributes - object with correct field set to value or 0
  */
  formatHTCLRisk: (response, area, tcValue, ptcValue) => {
    let config = analysisConfig[KEYS.R_HTCL];
    let grader = riskGrader[KEYS.R_HTCL];
    let attributes = {};
    let rawValue;
    // Parse the counts array
    let counts = getCounts(response.histograms);
    let aridArea = counts[1] || 0;

    if ((aridArea / area) > 0.80) {
      rawValue = 10;
    } else if ((ptcValue / area) < 0.1) {
      rawValue = 10;
    } else {
      rawValue = tcValue / ptcValue;
    }

    attributes[config.field] = grader(rawValue) || 0;
    return attributes;
  }

};
