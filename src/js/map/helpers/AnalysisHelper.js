import GraphicsHelper from 'helpers/GraphicsHelper';
import Deferred from 'dojo/Deferred';
import Request from 'utils/request';
import {errors} from 'js/config';

const AnalysisHelper = {

  findWatershed: pointGeometry => {
    brApp.debug('AnalysisHelper >>> findWatershed');
    let deferred = new Deferred();
    Request.getWatershedByGeometry(pointGeometry).then(feature => {
      if (feature) {
        deferred.resolve(feature);
        brApp.map.centerAndZoom(pointGeometry, 8);
      } else {
        deferred.reject(errors.featureNotFound);
      }
    }, err => {
      console.error(err);
      deferred.reject(err);
    });
    return deferred;
  },

  performUpstreamAnalysis: geometry => {
    brApp.debug('AnalysisHelper >>> performUpstreamAnalysis');
    Request.getUpstreamAnalysis(geometry).then(dataValue => {
      dataValue.features.forEach(feature => {
        GraphicsHelper.addUpstreamGraphic(feature);
      });
    }, console.error);
  }

};

export { AnalysisHelper as default };
