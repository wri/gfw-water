import GraphicsHelper from 'helpers/GraphicsHelper';
import {analysisPanelText} from 'js/config';
import registry from 'dijit/registry';
import alt from 'js/alt';

class AnalysisActions {

  analyzeCurrentWatershed (feature) {
    brApp.debug('AnalysisActions >>> analyzeCurrentWatershed');
    GraphicsHelper.addActiveWatershed(feature);
    this.dispatch(feature);
  }

  analyzeCustomArea (feature) {
    brApp.debug('AnalysisActions >>> analyzeCustomArea');
    GraphicsHelper.addCustomPoint(feature);
    this.dispatch(feature);
  }

  clearActiveWatershed () {
    brApp.debug('AnalysisActions >>> clearActiveWatershed');
    this.dispatch();
    //- Clear Highlight Polygons
    GraphicsHelper.clearActiveWatersheds();
    registry.byId(analysisPanelText.searchWidgetId).clear();
  }

  clearCustomArea () {
    brApp.debug('AnalysisActions >>> clearCustomArea');
    this.dispatch();
    //- Clear Highlight Polygons
    GraphicsHelper.clearCustomAreas();
    registry.byId(analysisPanelText.searchWidgetId).clear();
  }

  setCustomAreaName (newName) {
    brApp.debug('AnalysisActions >>> setCustomAreaName');
    this.dispatch(newName);
  }

  setAnalysisType (tabId) {
    this.dispatch(tabId);
  }

  toggleDrawToolbar (status) {
    this.dispatch(status);
  }

}

export const analysisActions = alt.createActions(AnalysisActions);
