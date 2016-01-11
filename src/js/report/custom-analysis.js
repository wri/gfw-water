import Histogram from 'js/compute-histogram';
import {analysisConfig} from 'js/config';
import Deferred from 'dojo/Deferred';
import KEYS from 'js/constants';



/**
* @param {esriGeometryPolygon} - geometry
* @return {deferred} promise
*/
const customAnalysis = (geometry) => {
  let promise = new Deferred();

  // Wetlands Analysis
  Histogram.getWithMosaic(analysisConfig[KEYS.WETLAND], geometry).then(function (res) {
    console.log(res);
  });

  // Tree Cover Density Analysis
  Histogram.getWithMosaic(analysisConfig[KEYS.TCD], geometry).then(function (res) {
    console.log(res);
  });

  promise.resolve();
  return promise;
};

export { customAnalysis as default };
