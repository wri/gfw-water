import GraphicsHelper from 'helpers/GraphicsHelper';
import Deferred from 'dojo/Deferred';
import Polygon from 'esri/geometry/Polygon';
import Request from 'utils/request';
import webMercatorUtils from 'esri/geometry/webMercatorUtils';
import {errors} from 'js/config';

const AnalysisHelper = {

  findWatershed: pointGeometry => {
    brApp.debug('AnalysisHelper >>> findWatershed');
    let deferred = new Deferred();
    Request.getWatershedByGeometry(pointGeometry).then(feature => {
      if (feature) {
        deferred.resolve(feature);
        GraphicsHelper.clearPoints();
        GraphicsHelper.addCustomPoint(pointGeometry);
      } else {
        GraphicsHelper.clearPoints();
        deferred.reject(errors.featureNotFound);
      }
    }, err => {
      GraphicsHelper.clearPoints();
      deferred.reject(err);
    });
    return deferred;
  },

  performUpstreamAnalysis: geometry => {
    brApp.debug('AnalysisHelper >>> performUpstreamAnalysis');
    let deferred = new Deferred();
    Request.getUpstreamAnalysis(geometry).then(dataValue => {
      if (dataValue.features.length === 1) {
        dataValue.features.forEach(feat => {
          const geom = new Polygon({
            rings: feat.geometry.rings
          });
          feat.geometry = webMercatorUtils.geographicToWebMercator(geom);
          GraphicsHelper.addUpstreamGraphic(feat);
        });
        //I need this in web mercator!
        console.log('dataValue.features[0]', dataValue.features[0]);
        // dataValue.features.forEach(GraphicsHelper.addUpstreamGraphic);
        deferred.resolve(dataValue.features[0]);
      }
    }, deferred.reject);
    return deferred;
  }

};

export { AnalysisHelper as default };
