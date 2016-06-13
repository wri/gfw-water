import {performRiskAnalysis} from 'report/custom-analysis';
import {analysisActions} from 'actions/AnalysisActions';
import {analysisPanelText as text} from 'js/config';
import lang from 'dojo/_base/lang';
import alt from 'js/alt';

class AnalysisStore {

  constructor () {
    this.isLoading = false;
    this.toolbarActive = false;
    this.activeWatershed = null;
    this.activeCustomArea = null;
    this.activeTab = text.watershedTabId;
    this.customAreaName = text.customAreaNamePlaceholder;

    this.bindListeners({
      toggleLoader: analysisActions.toggleLoader,
      clearCustomArea: analysisActions.clearCustomArea,
      setAnalysisType: analysisActions.setAnalysisType,
      toggleDrawToolbar: analysisActions.toggleDrawToolbar,
      analyzeCustomArea: analysisActions.analyzeCustomArea,
      setCustomAreaName: analysisActions.setCustomAreaName,
      clearActiveWatershed: analysisActions.clearActiveWatershed,
      analyzeCurrentWatershed: analysisActions.analyzeCurrentWatershed
    });
  }

  clearActiveWatershed () {
    this.toolbarActive = false;
    this.activeWatershed = null;
  }

  clearCustomArea () {
    this.toolbarActive = false;
    this.activeCustomArea = null;
  }

  analyzeCurrentWatershed (feature) {
    this.activeWatershed = feature;
  }

  analyzeCustomArea (payload) {
    const {feature, surroundingWatershed} = payload;
    //- Make sure the area is in hectares and not square kilometers
    let area = feature.attributes[text.watershedAreaField];
    let geometry = feature.geometry;
    performRiskAnalysis(geometry, area, surroundingWatershed).then((attributes) => {
      lang.mixin(feature.attributes, attributes);
      this.activeCustomArea = feature;
      this.isLoading = false;
      this.emitChange();
    });
  }

  setCustomAreaName (newName) {
    this.customAreaName = newName;
  }

  setAnalysisType (tabId) {
    this.activeTab = tabId;
  }

  toggleDrawToolbar (status) {
    this.toolbarActive = status;
  }

  toggleLoader (status) {
    this.isLoading = status;
    //- Give it a timeout of 30 secs if we are enabling the loader
    if (status) {
      this.applyTimeout('isLoading', 30000);
    }
  }

  /**
  * Takes a boolean that is true, and after the duration, if it's still true, sets it to false
  * @param {string} property - property in this store which we want to set to false after the timeout
  * @param {number} duration - timeout duration
  */
  applyTimeout (property, duration) {
    setTimeout(() => {
      if (this[property] === true) {
        this[property] = false;
        this.emitChange();
      }
    }, duration);
  }

}

export const analysisStore = alt.createStore(AnalysisStore, 'AnalysisStore');
