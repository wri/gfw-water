import GraphicsHelper from 'helpers/GraphicsHelper';
import {analysisPanelText} from 'js/config';
import registry from 'dijit/registry';
import Request from 'utils/request';
import alt from 'js/alt';

class AnalysisActions {

  findWatershed (pointGeometry) {
    app.debug('AnalysisActions >>> findWatershed');
    Request.getWatershedByGeometry(pointGeometry).then(feature => {
      this.actions.analyzeFeature(feature);
      app.map.setExtent(feature.geometry.getExtent(), true);
      //- Add Highlight polygon
      GraphicsHelper.addActiveWatershed(feature);
    }, console.error);
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
