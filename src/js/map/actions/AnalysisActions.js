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
    brApp.debug('AnalysisActions >>> setAnalysisType');
    this.dispatch(tabId);
  }

  toggleDrawToolbar (status) {
    brApp.debug('AnalysisActions >>> toggleDrawToolbar');
    this.dispatch(status);
  }

  /**
  * @param {string} featureId - Id to be passed to report, format is W_{objectid} or C_{objectid}
  * @param {number} canopyDensity - Current Tree Canopy Density
  */
  launchReport (featureId, canopyDensity) {
    brApp.debug('AnalysisActions >>> launchReport');
    window.open(`report.html?fid=${featureId}&canopyDensity=${canopyDensity}`);
  }

}

export const analysisActions = alt.createActions(AnalysisActions);
