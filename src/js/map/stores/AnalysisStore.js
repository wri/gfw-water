import {analysisActions} from 'actions/AnalysisActions';
import {analysisPanelText} from 'js/config';
import alt from 'js/alt';

class AnalysisStore {

  constructor () {
    this.isLoading = false;
    this.toolbarActive = false;
    this.activeWatershed = null;
    this.activeCustomArea = null;
    this.activeTab = analysisPanelText.watershedTabId;
    this.customAreaName = analysisPanelText.customAreaNamePlaceholder;

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

  analyzeCustomArea (feature) {
    this.activeCustomArea = feature;
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
    //- Give it a timeout of 15 secs if we are enabling the loader
    if (status) {
      this.applyTimeout('isLoading', 15000);
    }
  }

  /**
  * Takes a property of type boolean, it should be true, and after the duration, if it's still true, sets it false
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
