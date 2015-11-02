import GraphicsHelper from 'helpers/GraphicsHelper';
import {analysisPanelText, errors} from 'js/config';
import registry from 'dijit/registry';
import Deferred from 'dojo/Deferred';
import Request from 'utils/request';
import alt from 'js/alt';

class AnalysisActions {

  findWatershed (pointGeometry) {
    app.debug('AnalysisActions >>> findWatershed');
    let deferred = new Deferred();
    Request.getWatershedByGeometry(pointGeometry).then(feature => {
      if (feature) {
        //- Just resolve to note that a feature has been found, else, reject
        deferred.resolve();
        //- Pass the feature to the analysis store
        this.actions.analyzeFeature(feature);
        //- Add Highlight polygon
        GraphicsHelper.addActiveWatershed(feature);
        app.map.setExtent(feature.geometry.getExtent(), true);
      } else {
        deferred.reject(errors.featureNotFound);
      }
    }, err => {
      console.error(err);
      deferred.reject(err);
    });
    return deferred;
  }

  getUpstreamAnalysis (geometry) {
    Request.getUpstreamAnalysis(geometry);
  }

  analyzeFeature (feature) {
    app.debug('AnalysisActions >>> analyzeFeature');
    this.dispatch(feature);
  }

  clearAnalysis () {
    app.debug('AnalysisActions >>> clearAnalysis');
    this.dispatch();
    //- Clear Highlight Polygons
    GraphicsHelper.clearFeatures();
    registry.byId(analysisPanelText.searchWidgetId).clear();
  }

  setAnalysisType (tabId) {
    this.dispatch(tabId);
  }

  addPointFromDraw (geometry) {
    GraphicsHelper.addPoint(geometry);
  }

  toggleDrawToolbar (status) {
    this.dispatch(status);
  }

  /**
  * GraphicsHelper.addPointFromLatLng returns a point object
  * This enables the callee of this function to pass that point on to other methods
  * without having to explicitly create a point and use other methods
  */
  addPointFromLatLng (lat, lon) {
    return GraphicsHelper.addPointFromLatLng(lat, lon);
  }

}

export const analysisActions = alt.createActions(AnalysisActions);
