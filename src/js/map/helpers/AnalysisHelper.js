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
        GraphicsHelper.addCustomPoint(pointGeometry);
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
    let deferred = new Deferred();
    Request.getUpstreamAnalysis(geometry).then(dataValue => {
      if (dataValue.features.length === 1) {
        dataValue.features.forEach(GraphicsHelper.addUpstreamGraphic);
        deferred.resolve(dataValue.features[0]);
      }
    }, err => { console.log('HeyOhhh'); deferred.reject(err); });
    return deferred;
  }

};

export { AnalysisHelper as default };
