import RasterFunction from 'esri/layers/RasterFunction';

export default {

  /**
  * Generate a Colormap Raster Function that Remaps the data to the output values
  * @param {array} colormap - An Array of arrays representing the colormap, eg. [[1, 225, 225, 225]]
  * @param {array} inputRanges - [inclusive, exclusive], if your doing 1 - 3, should look like [1, 4]
  * @param {array} outputValues
  */
  getColormapRemap: (colormap, inputRanges, outputValues) => {
    brApp.debug('rasterFunctions >>> getColormapRemap');
    return new RasterFunction({
      'rasterFunction': 'Colormap',
      'rasterFunctionArguments': {
        'Colormap': colormap,
        'Raster': {
          'rasterFunction': 'Remap',
          'rasterFunctionArguments': {
            'InputRanges': inputRanges,
            'OutputValues': outputValues,
            'AllowUnmatched': false
          }
        }
      },
      'variableName': 'Raster'
    });
  },

  /**
  * Generate a Raster Function for the new Tree Cover Loss Layer
  * @param {number} fromYear - beginning year of current selected range
  * @param {number} toYear - end year of current selected range
  * @param {number} density - canopy density
  */
  getLossFunction: (fromYear, toYear, density) => {
    brApp.debug('rasterFunctions >>> getLossFunction');
    return new RasterFunction({
      'rasterFunction': 'ForestCover_lossyear_density',
      'rasterFunctionArguments': {
        'min_year': fromYear,
        'max_year': toYear,
        'min_density': density,
        'max_density': 100
      }
    });
  }

};
