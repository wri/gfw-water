import GraphicsHelper from 'helpers/GraphicsHelper';
import {analysisPanelText} from 'js/config';
import registry from 'dijit/registry';
import Deferred from 'dojo/Deferred';
import KEYS from 'js/constants';
import alt from 'js/alt';

class AnalysisActions {

  analyzeCurrentWatershed (feature) {
    brApp.debug('AnalysisActions >>> analyzeCurrentWatershed');
    GraphicsHelper.addActiveWatershed(feature);
    this.dispatch(feature);
  }

  analyzeCustomArea (feature, surroundingWatershed) {
    brApp.debug('AnalysisActions >>> analyzeCustomArea');
    this.dispatch({
      surroundingWatershed,
      feature
    });
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

  toggleLoader (status) {
    brApp.debug('AnalysisActions >>> toggleLoader');
    this.dispatch(status);
  }

  /**
  * Use apply-edits to save a feature to a feature layer and proxy results back through callback
  * @param {Feature} feature - esri feature to be saved/updated
  * @return {deferred} deferred
  */
  saveFeature (feature) {
    brApp.debug('MapActions >>> saveFeature');
    let featureLayer = brApp.map.getLayer(KEYS.customAreaFeatures);
    let deferred = new Deferred();
    if (!featureLayer) { deferred.reject(); return deferred; }
    featureLayer.applyEdits([feature], null, null, (res) => {
      deferred.resolve(res);
    }, (err) => { deferred.reject(err); });
    return deferred;
  }

  /**
  * @param {string} featureId - Id to be passed to report, format is W_{objectid} or C_{objectid}
  * @param {number} canopyDensity - Current Tree Canopy Density
  */
  launchReport (featureId, canopyDensity) {
    brApp.debug('AnalysisActions >>> launchReport');
    window.open(`../report/index.html?fid=${featureId}&canopyDensity=${canopyDensity}`);
  }

}

export const analysisActions = alt.createActions(AnalysisActions);
