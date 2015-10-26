import GraphicsHelper from 'helpers/GraphicsHelper';
import {analysisPanelText} from 'js/config';
import registry from 'dijit/registry';
import Request from 'utils/request';
import alt from 'js/alt';

class AnalysisActions {

  findWatershed (point) {
    app.debug('AnalysisActions >>> findWatershed');
    Request.getWatershedByGeometry(point.geometry).then(feature => {
      this.actions.analyzeFeature(feature.attributes.objectid);
      app.map.setExtent(feature.geometry.getExtent(), true);
      //- Add Highlight polygon
      GraphicsHelper.addActiveWatershed(feature);
    }, console.error);
  }

  analyzeFeature (featureId) {
    app.debug('AnalysisActions >>> analyzeFeature');
    this.dispatch(featureId);
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

}

export const analysisActions = alt.createActions(AnalysisActions);
